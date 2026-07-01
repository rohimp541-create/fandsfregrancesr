const logger = require('../utils/logger');
const telegram = require('../utils/telegram');
// const Order = require('../models/Order');       // [DB-ISOLATED] commented out
// const eventBus = require('../events/eventBus'); // [DB-ISOLATED] no socket events without DB
// const googleSheets = require('../utils/googleSheets'); // [DB-ISOLATED] no sheets sync without DB

const { asyncHandler } = require('../middleware/errorHandler');

// ─────────────────────────────────────────────────────────────────────────────
// NOTE: Database operations are intentionally commented out for emergency
// stabilisation. The store runs in "Bot-Only" mode:
//   • Telegram (chat 8633966933) is the single source of truth for orders.
//   • All customers always receive a 201 success response.
//   • No DB reads/writes occur. No side-effects. No partial state.
// To re-enable DB: uncomment the require() lines above and the DB block below.
// ─────────────────────────────────────────────────────────────────────────────

const orderController = {

  // ── getAll ─── returns empty list while DB is isolated ─────────────────────
  getAll: asyncHandler(async (_req, res) => {
    // [DB-ISOLATED] const orders = await Order.findAll();
    res.json({ success: true, data: [] });
  }),

  // ── getById ── returns 404 gracefully while DB is isolated ─────────────────
  getById: asyncHandler(async (req, res) => {
    // [DB-ISOLATED] const order = await Order.findById(req.params.id);
    res.status(404).json({ success: false, message: 'Order lookup unavailable in Bot-Only mode.' });
  }),

  // ── create ─── Telegram-only, always responds 201 ──────────────────────────
  create: asyncHandler(async (req, res) => {
    const { customer_name, phone, address, items, total_price } = req.body;

    // ── Input validation ───────────────────────────────────────────────────
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

    // ── Build order payload (no DB id — Bot-Only mode) ─────────────────────
    const computedTotal = total_price ||
      items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    const orderPayload = {
      customer_name,
      phone,
      address,
      items,
      total_price: computedTotal,
      status: 'pending',
    };

    // ── Send Telegram notification ─────────────────────────────────────────
    // Awaited directly — we want to confirm it fired before responding.
    // notifyNewOrder internally catches all errors, so this never throws.
    await telegram.notifyNewOrder(orderPayload);

    // ── [DB-ISOLATED] Database save — commented out, preserved for re-enable ─
    /*
    let savedOrder = null;
    let updatedProducts = [];
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

      eventBus.emitOrderCreated(savedOrder);
      updatedProducts.forEach((p) => {
        const formatted = {
          id: p.id, name: p.name, name_en: p.name_en,
          price: parseFloat(p.price), image: p.image,
          description: p.description, description_en: p.description_en,
          stock_quantity: p.stock_quantity, vendor: p.vendor,
          in_stock: p.stock_quantity > 0,
        };
        eventBus.emitStockUpdated(formatted);
        eventBus.emitProductUpdated(formatted);
      });

      googleSheets.syncOrder(savedOrder, 'create');
    } catch (dbErr) {
      logger.error(`[Order] ❌ DB save failed: ${dbErr.message}`);
    }
    */

    // ── Always respond with 201 success ────────────────────────────────────
    logger.info(`[Order] ✅ Bot-Only order received — ${customer_name} | ${phone}`);

    return res.status(201).json({
      success: true,
      data: orderPayload,
    });
  }),

  // ── updateStatus ─── disabled while DB is isolated ─────────────────────────
  updateStatus: asyncHandler(async (_req, res) => {
    // [DB-ISOLATED] const order = await Order.updateStatus(req.params.id, status);
    res.status(503).json({
      success: false,
      message: 'Status updates unavailable in Bot-Only mode.',
    });
  }),

  // ── delete ─── disabled while DB is isolated ───────────────────────────────
  delete: asyncHandler(async (_req, res) => {
    // [DB-ISOLATED] const order = await Order.delete(req.params.id);
    res.status(503).json({
      success: false,
      message: 'Order deletion unavailable in Bot-Only mode.',
    });
  }),
};

module.exports = orderController;
