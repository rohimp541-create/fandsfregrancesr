const https = require('https');

const BOT_TOKEN = '8263752644:AAHJx4sYM5ociQn7_16ckL1UbA9UiFoNzds';
const ID_1 = '8633966933';
const ID_2 = '1431249497';

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

module.exports = {
  async create(req, res) {
    const orderData = req.body || {};
    const text = '📦 طلب جديد:\n' + JSON.stringify(orderData, null, 2);

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
