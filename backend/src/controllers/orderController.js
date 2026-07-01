const https = require('https');

// ── Telegram config ──────────────────────────────────────────────────────────
const BOT_TOKEN = '8263752644:AAHJx4sYM5ociQn7_16ckL1UbA9UiFoNzds';
const CHAT_ID   = '8633966933';

// ── Send a message to Telegram (plain HTTPS, no extra packages needed) ───────
function sendTelegram(text) {
  const body = JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' });
  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${BOT_TOKEN}/sendMessage`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
  };
  // Fire-and-forget — we don't wait for Telegram to reply before responding to the customer
  const req = https.request(options, (res) => {
    res.resume(); // drain response so the connection closes cleanly
  });
  req.on('error', (err) => console.error('[Telegram] send error:', err.message));
  req.write(body);
  req.end();
}

// ── Build the Telegram message from order data ────────────────────────────────
function buildMessage(order) {
  const { customer_name, phone, address, items = [], total_price } = order;

  const itemLines = items
    .map((i) => `  • ${i.name || i.product_name || `#${i.product_id}`} × ${i.quantity} — ${((i.price || 0) * i.quantity).toFixed(2)} SAR`)
    .join('\n');

  return (
    `🛒 *طلب جديد*\n` +
    `👤 ${customer_name}\n` +
    `📞 ${phone}\n` +
    `📍 ${address}\n\n` +
    `📦 *المنتجات:*\n${itemLines || '  —'}\n\n` +
    `💰 *الإجمالي:* ${Number(total_price || 0).toFixed(2)} SAR\n` +
    `🕐 ${new Date().toLocaleString('ar-SA', { timeZone: 'Asia/Riyadh' })}`
  );
}

// ── Controller ────────────────────────────────────────────────────────────────
const orderController = {

  // Disabled endpoints — return graceful stubs
  getAll:       (_req, res) => res.json({ success: true, data: [] }),
  getById:      (_req, res) => res.status(404).json({ success: false, message: 'Bot-Only mode.' }),
  updateStatus: (_req, res) => res.status(503).json({ success: false, message: 'Bot-Only mode.' }),
  delete:       (_req, res) => res.status(503).json({ success: false, message: 'Bot-Only mode.' }),

  // ── CREATE — the only active endpoint ──────────────────────────────────────
  create(req, res) {
    const { customer_name, phone, address, items, total_price } = req.body;

    // Basic validation
    if (!customer_name || !phone || !address) {
      return res.status(400).json({ success: false, message: 'Name, phone, and address are required.' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must have at least one item.' });
    }

    // 1. Send Telegram notification (fire-and-forget — never blocks the response)
    const computedTotal = total_price || items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
    sendTelegram(buildMessage({ customer_name, phone, address, items, total_price: computedTotal }));

    // 2. Immediately return success — customer never waits on Telegram
    return res.status(201).json({
      success: true,
      message: 'Thank you for your order.',
      data: { customer_name, phone, address, items, total_price: computedTotal, status: 'pending' },
    });
  },
};

module.exports = orderController;
