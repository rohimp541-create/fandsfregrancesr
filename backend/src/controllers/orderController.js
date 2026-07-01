const Order = require('../models/Order');
const eventBus = require('../events/eventBus');
const { asyncHandler } = require('../middleware/errorHandler');
const googleSheets = require('../utils/googleSheets');
const telegram = require('../utils/telegram');

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

    try {
      const { order, updatedProducts } = await Order.create({
        customer_name,
        phone,
        address,
        items,
        total_price: total_price || items.reduce((sum, i) => sum + (i.price * i.quantity), 0),
      });

      eventBus.emitOrderCreated(order);
      updatedProducts.forEach((p) => {
        eventBus.emitStockUpdated(formatProductForSocket(p));
        eventBus.emitProductUpdated(formatProductForSocket(p));
      });

      // Sync to Google Sheets (non-blocking)
      googleSheets.syncOrder(order, 'create');

      // Telegram notification — fire-and-forget, never delays the response
      telegram.notifyNewOrder(order);

      res.status(201).json({ success: true, data: order });
    } catch (error) {
      error.statusCode = 400;
      throw error;
    }
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
