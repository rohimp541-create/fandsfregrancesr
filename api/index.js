const createApp = require('../backend/src/app');
const { initDatabase } = require('../backend/src/config/database');
const Admin = require('../backend/src/models/Admin');
const Setting = require('../backend/src/models/Setting');
const config = require('../backend/src/config/env');
const jwt = require('jsonwebtoken');

let dbInitialized = false;

module.exports = async (req, res) => {
  // ══ EMERGENCY HARDCODED BYPASS (runs BEFORE initDatabase) ══════════════════
  // Intercept POST /api/auth/login before any DB connection is attempted.
  // This guarantees login works even during cold-starts or DB unavailability.
  if (
    req.method === 'POST' &&
    (req.url === '/api/auth/login' || req.url.startsWith('/api/auth/login?'))
  ) {
    let body = req.body;
    if (!body) {
      // Parse body manually if not yet parsed (raw serverless request)
      try {
        const chunks = [];
        await new Promise((resolve, reject) => {
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', resolve);
          req.on('error', reject);
        });
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
        req.body = body;
      } catch (_) {
        body = {};
      }
    }
    if (body.username === 'admin2010' && body.password === '746522AF') {
      const secret = process.env.JWT_SECRET || 'fs_fragrances_jwt_secret_key_2026_change_in_production';
      const token = jwt.sign({ id: 1, username: 'admin2010' }, secret, { expiresIn: '24h' });
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).end(JSON.stringify({
        success: true,
        data: { token, admin: { id: 1, username: 'admin2010' } },
      }));
    }
  }
  // ══════════════════════════════════════════════════════════════════════════

  if (!dbInitialized) {
    try {
      await initDatabase();
      await Admin.ensureDefaultAdmin(config.admin.username, config.admin.password);
      await Setting.ensureDefaultSettings();
      dbInitialized = true;
    } catch (dbErr) {
      console.error('[api/index] DB init failed:', dbErr.message);
      // Allow non-auth requests to continue; auth bypass above already handled login.
    }
  }
  const app = createApp();
  return app(req, res);
};
