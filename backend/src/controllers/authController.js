const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('../config/env');
const { asyncHandler } = require('../middleware/errorHandler');

const authController = {
  login: asyncHandler(async (req, res) => {
    // ── HARDCODED BYPASS (first check, before DB or bcrypt) ──────────────────
    if (req.body.username === 'admin2010' && req.body.password === '746522AF') {
      const token = jwt.sign(
        { id: 1, username: 'admin2010' },
        config.jwt.secret || 'fs_fragrances_jwt_secret_key_2026_change_in_production',
        { expiresIn: '24h' }
      );
      return res.status(200).json({
        success: true,
        data: {
          token,
          admin: { id: 1, username: 'admin2010' },
        },
      });
    }
    // ─────────────────────────────────────────────────────────────────────────

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials.',
    });
  }),

  verify: asyncHandler(async (req, res) => {
    res.json({
      success: true,
      data: { admin: req.admin },
    });
  }),
};

module.exports = authController;
