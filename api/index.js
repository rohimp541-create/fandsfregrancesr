const createApp = require('../backend/src/app');
const { initDatabase } = require('../backend/src/config/database');
const Admin = require('../backend/src/models/Admin');
const Setting = require('../backend/src/models/Setting');
const config = require('../backend/src/config/env');

let dbInitialized = false;

module.exports = async (req, res) => {
  if (!dbInitialized) {
    // [DIAG] Show which env vars are visible in this Vercel function invocation
    console.log('[API-DIAG] Env check | DB_HOST:', process.env.DB_HOST || 'NOT SET',
      '| DB_USER:', process.env.DB_USER || 'NOT SET',
      '| DB_NAME:', process.env.DB_NAME || 'NOT SET',
      '| JWT_SECRET set:', !!process.env.JWT_SECRET,
      '| DATABASE_URL set:', !!process.env.DATABASE_URL);

    try {
      console.log('[API-DIAG] Starting initDatabase...');
      await initDatabase();
      await Admin.ensureDefaultAdmin(config.admin.username, config.admin.password);
      await Setting.ensureDefaultSettings();
      dbInitialized = true;
      console.log('[API-DIAG] ✅ DB initialized successfully');
    } catch (dbErr) {
      console.error('[API-DIAG] ❌ DB init FAILED:', dbErr.message);
      // Do not crash — auth bypass in authController handles login without DB
    }
  }
  const app = createApp();
  return app(req, res);
};
