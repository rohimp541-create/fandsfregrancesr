const Order = require('../models/Order');
const eventBus = require('../events/eventBus');
const { asyncHandler } = require('../middleware/errorHandler');
const googleSheets = require('../utils/googleSheets');
const telegram = require('../utils/telegram');
const logger = require('../utils/logger');

function formatProductForSocket(row) {
  return {
    id: row.id,
    name: row.name,
    name_en: row.name_en,
    price: parseFloat(row.price),
    image: row.image,
    description: row.description,
    description_en: row.description_en,
    stock_quantity: row.stock_quantity,
    vendor: row.vendor,
    in_stock: row.stock_quantity > 0,
  };
}

const orderController = {
  getAll: asyncHandler(async (req, res) => {
    const orders = await Order.findAll();
    res.json({ success: true, data: orders });
  }),

  getById: asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }
    res.json({ success: true, data: order });
  }),

  create: asyncHandler(async (req, res) => {
    const { customer_name, phone, address, items, total_price } = req.body;

    // ── Input validation ────────────────────────────────────────────────────
    if (!customer_name || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: 'Customer name, phone, and address are required.',
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item.',
      });
    }

    for (const item of items) {
      if (!item.product_id || !item.quantity || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have product_id and quantity >= 1.',
        });
      }
    }

    // ── Build a lightweight order payload for Telegram ──────────────────────
    // We construct this BEFORE the DB call so Telegram always has the data,
    // even if the database save fails entirely.
    const computedTotal = total_price ||
      items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    const orderPayload = {
      customer_name,
      phone,
      address,
      items,
      total_price: computedTotal,
    };

    // ── Parallel: Telegram + DB save ────────────────────────────────────────
    // Both operations start at the same time.
    // - Telegram uses the raw payload so it fires regardless of DB outcome.
    // - DB save is wrapped in its own try/catch — failures are swallowed.
    // - Promise.allSettled guarantees we wait for both before responding,
    //   and that neither failure propagates as an unhandled rejection.

    let savedOrder = null;
    let updatedProducts = [];

    const [telegramResult, dbResult] = await Promise.allSettled([
      // ① Telegram — always runs, uses raw payload
      telegram.notifyNewOrder(orderPayload),

      // ② Database save — isolated; failure must not surface to the user
      (async () => {
        try {
          const result = await Order.create({
            customer_name,
            phone,
            address,
            items,
            total_price: computedTotal,
          });
          savedOrder = result.order;
          updatedProducts = result.updatedProducts;
        } catch (dbErr) {
          // Log internally — do NOT re-throw; user still gets a success response
          logger.error(`[Order] ❌ DB save failed (order NOT stored): ${dbErr.message}`);
        }
      })(),
    ]);

    // ── Log Telegram outcome ────────────────────────────────────────────────
    if (telegramResult.status === 'rejected') {
      logger.warn(`[Order] Telegram promise rejected unexpectedly: ${telegramResult.reason}`);
    }

    // Unused — dbResult is always 'fulfilled' because we catch inside the IIFE,
    // but we log it defensively in case something slipped through.
    if (dbResult.status === 'rejected') {
      logger.error(`[Order] Unhandled DB promise rejection: ${dbResult.reason}`);
    }

    // ── Post-save side-effects (only if DB succeeded) ───────────────────────
    if (savedOrder) {
      eventBus.emitOrderCreated(savedOrder);
      updatedProducts.forEach((p) => {
        eventBus.emitStockUpdated(formatProductForSocket(p));
        eventBus.emitProductUpdated(formatProductForSocket(p));
      });

      // Google Sheets sync — fire-and-forget
      googleSheets.syncOrder(savedOrder, 'create');
    }

    // ── Always respond with success ─────────────────────────────────────────
    // The user confirmed their order. Telegram is the source of truth.
    // If DB failed, the operator still receives the Telegram notification.
    res.status(201).json({
      success: true,
      data: savedOrder || {
        // Return a minimal echo of the order so the frontend can display it
        customer_name,
        phone,
        address,
        items,
        total_price: computedTotal,
        status: 'pending',
      },
    });
  }),

  updateStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    try {
      const order = await Order.updateStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }

      eventBus.emitOrderUpdated(order);

      // Sync to Google Sheets (non-blocking)
      googleSheets.syncOrder(order, 'update');

      res.json({ success: true, data: order });
    } catch (error) {
      error.statusCode = 400;
      throw error;
    }
  }),

  delete: asyncHandler(async (req, res) => {
    const order = await Order.delete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    eventBus.emitOrderDeleted(order.id);
    res.json({ success: true, message: 'Order deleted.', data: { id: order.id } });
  }),
};

module.exports = orderController;
