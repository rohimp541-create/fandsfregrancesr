const logger = require('./logger');

// Telegram Bot configuration — read from env, fall back to build-time constants
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8263752644:AAHJx4sYM5ociQn7_16ckL1UbA9UiFoNzds';
const CHAT_IDS  = process.env.TELEGRAM_CHAT_IDS
  ? process.env.TELEGRAM_CHAT_IDS.split(',').map((id) => id.trim())
  : ['1431249497', '8633966933'];

let bot = null;

/**
 * Lazily initialise the Telegram bot (once per process).
 * polling: false → safe for Vercel Serverless / webhook environments.
 */
function getBot() {
  if (!bot) {
    try {
      const TelegramBot = require('node-telegram-bot-api');
      bot = new TelegramBot(BOT_TOKEN, { polling: false });
    } catch (err) {
      logger.warn('[Telegram] node-telegram-bot-api not available: ' + err.message);
    }
  }
  return bot;
}

/**
 * Build a human-readable message for a new order.
 */
function buildOrderMessage(order) {
  const itemLines = (order.items || [])
    .map((i) => `  • ${i.product_name || `#${i.product_id}`} × ${i.quantity} — ${(i.price * i.quantity).toFixed(2)} SAR`)
    .join('\n');

  return (
    `🛒 *طلب جديد #${order.id}*\n` +
    `👤 ${order.customer_name}\n` +
    `📞 ${order.phone}\n` +
    `📍 ${order.address}\n` +
    `\n📦 *المنتجات:*\n${itemLines || '  —'}\n` +
    `\n💰 *الإجمالي:* ${Number(order.total_price).toFixed(2)} SAR\n` +
    `🕐 ${new Date().toLocaleString('ar-SA', { timeZone: 'Asia/Riyadh' })}`
  );
}

/**
 * Send a new-order notification to all configured chat IDs.
 * Fire-and-forget: always returns immediately — never awaited by the caller.
 */
function notifyNewOrder(order) {
  // Intentionally NOT awaited — this is fire-and-forget
  setImmediate(async () => {
    const tgBot = getBot();
    if (!tgBot) return;

    const text = buildOrderMessage(order);

    await Promise.allSettled(
      CHAT_IDS.map((chatId) =>
        tgBot
          .sendMessage(chatId, text, { parse_mode: 'Markdown' })
          .then(() => logger.info(`[Telegram] ✅ Notified chat ${chatId} for order #${order.id}`))
          .catch((err) => logger.warn(`[Telegram] ⚠️ Failed to notify chat ${chatId}: ${err.message}`))
      )
    );
  });
}

module.exports = { notifyNewOrder };
