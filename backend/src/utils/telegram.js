const logger = require('./logger');

// Telegram Bot configuration — read from env, fall back to build-time constants
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8263752644:AAHJx4sYM5ociQn7_16ckL1UbA9UiFoNzds';
const CHAT_IDS  = process.env.TELEGRAM_CHAT_IDS
  ? process.env.TELEGRAM_CHAT_IDS.split(',').map((id) => id.trim())
  : ['8633966933']; // [BOT-ONLY] single operator chat

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
 * Works with both a full saved order (has id) and a raw request payload (no id yet).
 */
function buildOrderMessage(order) {
  const orderRef  = order.id ? `#${order.id}` : '(pending DB)';
  const itemLines = (order.items || [])
    .map((i) => {
      const name  = i.product_name || i.name || `Product #${i.product_id}`;
      const total = ((i.price || 0) * (i.quantity || 1)).toFixed(2);
      return `  • ${name} × ${i.quantity} — ${total} SAR`;
    })
    .join('\n');

  const totalPrice = Number(
    order.total_price ||
    (order.items || []).reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0)
  ).toFixed(2);

  return (
    `🛒 *طلب جديد ${orderRef}*\n` +
    `👤 ${order.customer_name}\n` +
    `📞 ${order.phone}\n` +
    `📍 ${order.address}\n` +
    `\n📦 *المنتجات:*\n${itemLines || '  —'}\n` +
    `\n💰 *الإجمالي:* ${totalPrice} SAR\n` +
    `🕐 ${new Date().toLocaleString('ar-SA', { timeZone: 'Asia/Riyadh' })}`
  );
}

/**
 * Returns a Promise that resolves (never rejects) once messages are sent to all
 * configured chat IDs. Both chats are notified in parallel via Promise.allSettled.
 *
 * This function is designed to be awaited in Promise.allSettled() alongside the
 * DB save, so both run concurrently and neither blocks the other.
 */
async function notifyNewOrder(order) {
  const tgBot = getBot();
  if (!tgBot) {
    logger.warn('[Telegram] Bot not initialised — skipping notification');
    return;
  }

  const text = buildOrderMessage(order);

  await Promise.allSettled(
    CHAT_IDS.map((chatId) =>
      tgBot
        .sendMessage(chatId, text, { parse_mode: 'Markdown' })
        .then(() => logger.info(`[Telegram] ✅ Notified chat ${chatId} for order ref ${order.id || '(pre-DB)'}`))
        .catch((err) => logger.warn(`[Telegram] ⚠️ Failed to notify chat ${chatId}: ${err.message}`))
    )
  );
}

module.exports = { notifyNewOrder };
