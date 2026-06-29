const logger = require('./logger');

/**
 * Syncs order data to Google Sheets via Google Apps Script Web App Webhook.
 * @param {Object} order The formatted order object.
 * @param {string} action The action being performed: 'create' or 'update'.
 */
async function syncOrder(order, action) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    logger.warn('Google Sheets Webhook URL is not set (GOOGLE_SHEET_WEBHOOK_URL). Skipping sheet synchronization.');
    return;
  }

  try {
    const formattedItems = order.items
      ? order.items.map(item => `${item.product_name || `Product #${item.product_id}`} (x${item.quantity})`).join(', ')
      : '';

    const payload = {
      action: action,
      orderId: order.id,
      customerName: order.customer_name,
      phone: order.phone,
      address: order.address,
      items: formattedItems,
      totalPrice: order.total_price,
      status: order.status,
      date: order.created_at || new Date().toISOString()
    };

    logger.info(`Syncing order #${order.id} to Google Sheets... Action: ${action}`);

    // Node 18+ native fetch call
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      logger.error(`Google Sheets sync HTTP error! status: ${response.status}`);
      return;
    }

    const result = await response.json().catch(() => ({}));
    if (result.success) {
      logger.info(`Google Sheets sync completed successfully for order #${order.id}`);
    } else {
      logger.warn(`Google Sheets sync returned non-success: ${JSON.stringify(result)}`);
    }
  } catch (err) {
    logger.error(`Failed to sync order #${order.id} to Google Sheets:`, err);
  }
}

module.exports = { syncOrder };
