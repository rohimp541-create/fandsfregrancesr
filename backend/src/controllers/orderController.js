const https = require('https');

const BOT_TOKEN = '8263752644:AAHJx4sYM5ociQn7_16ckL1UbA9UiFoNzds';
const ID_1 = '8633966933';
const ID_2 = '1431249497';
const SHIPPING_FEE = 70;

function sendTelegramMessage(chatId, text) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ chat_id: chatId, text });
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      res.resume();
      res.on('end', () => resolve());
    });

    req.on('error', () => resolve());
    req.write(body);
    req.end();
  });
}

async function sendSystemCheck() {
  try {
    await sendTelegramMessage(ID_1, '✅ الموقع يعمل الآن والربط مع التليجرام سليم!');
  } catch (_) {}
}

sendSystemCheck();

function buildInvoiceText(orderData) {
  const items = Array.isArray(orderData.items) ? orderData.items : [];
  const itemsText = items.map((item) => {
    const name = item.name || item.product_name || item.title || 'منتج';
    const quantity = item.quantity || item.qty || 1;
    const price = item.price || 0;
    return `• ${name} | العدد: ${quantity} | السعر: ${price} ج.م`;
  }).join('\n');

  const additionalDetails = orderData.additionalDetails || orderData.additional_details || orderData.address || 'لا يوجد';
  const total = Number(orderData.totalPrice || orderData.total_price || 0) + SHIPPING_FEE;

  return `📦 طلب جديد من الموقع
-------------------------
👤 العميل: ${orderData.customerName || orderData.customer_name || 'غير محدد'}
📞 الهاتف: ${orderData.phone || 'غير محدد'}
📝 ملاحظات إضافية: ${additionalDetails}
-------------------------
🛒 المنتجات:\n${itemsText || 'لا توجد منتجات'}
-------------------------
🚚 مصاريف الشحن: ${SHIPPING_FEE} ج.م
💰 الإجمالي الكلي: ${total} ج.م
-------------------------`;
}

module.exports = {
  async create(req, res) {
    const orderData = req.body || {};
    const text = buildInvoiceText(orderData);

    try {
      await sendTelegramMessage(ID_1, text);
    } catch (_) {}

    try {
      await sendTelegramMessage(ID_2, text);
    } catch (_) {}

    return res.status(201).json({
      success: true,
      message: 'Thank you for your order',
    });
  },
};
