const { query } = require('../config/database');

const Setting = {
  async get(key) {
    const rows = await query('SELECT value FROM settings WHERE key = ?', [key]);
    return rows[0] ? rows[0].value : null;
  },

  async set(key, value) {
    const existing = await this.get(key);
    if (existing !== null) {
      await query('UPDATE settings SET value = ? WHERE key = ?', [value, key]);
    } else {
      await query('INSERT INTO settings (key, value) VALUES (?, ?)', [key, value]);
    }
  },

  async getAll() {
    const rows = await query('SELECT * FROM settings');
    const result = {};
    rows.forEach(r => {
      result[r.key] = r.value;
    });
    return result;
  },

  async ensureDefaultSettings() {
    const defaults = {
      offer_enabled: 'true',
      offer_text_ar: '🔥 عرض خاص لفترة محدودة! 🔥\nاحصل على قطعتين بـ 950 جنيه (توفير 48 جنيه)\nأو 3 قطع بـ 1350 جنيه فقط (توفير 147 جنيه!)',
      offer_text_en: '🔥 Limited Time Offer! 🔥\nBuy 2 bottles for 950 EGP (Save 48 EGP)\nor 3 bottles for 1350 EGP (Save 147 EGP!)',
      offer_type: 'popup'
    };

    for (const [key, val] of Object.entries(defaults)) {
      const current = await this.get(key);
      if (current === null || current.includes('500') || (key === 'offer_type' && current === 'banner')) {
        await this.set(key, val);
      }
    }
  }
};

module.exports = Setting;
