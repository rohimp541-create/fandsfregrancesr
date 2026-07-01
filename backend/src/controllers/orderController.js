const https = require('https');

const BOT_TOKEN = '8263752644:AAHJx4sYM5ociQn7_16ckL1UbA9UiFoNzds';
const CHAT_ID = '8633966933';

function sendSystemCheck() {
  const body = JSON.stringify({
    chat_id: CHAT_ID,
    text: '✅ الموقع يعمل الآن والربط مع التليجرام سليم!',
  });

  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${BOT_TOKEN}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  };

  const req = https.request(options);
  req.on('error', () => {});
  req.write(body);
  req.end();
}

sendSystemCheck();

module.exports = {
  async create(req, res) {
    const orderData = req.body || {};
    const body = JSON.stringify({
      chat_id: CHAT_ID,
      text: '📦 طلب جديد:\n' + JSON.stringify(orderData, null, 2),
    });

    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const reqTel = https.request(options);
    reqTel.on('error', () => {});
    reqTel.write(body);
    reqTel.end();

    return res.status(201).json({
      success: true,
      message: 'Thank you for your order',
    });
  },
};
