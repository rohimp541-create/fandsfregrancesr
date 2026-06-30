const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('../config/env');
const { asyncHandler } = require('../middleware/errorHandler');

const authController = {
  login: asyncHandler(async (req, res) => {
    // ── HARDCODED BYPASS (first check, before DB or bcrypt) ──────────────────
    if (req.body.username === 'admin2010' && req.body.password === '746522AF') {
      // Use unified secret — must match auth.js middleware and api/index.js
      const JWT_SECRET = process.env.JWT_SECRET || 'fs_fragrances_jwt_secret_key_2026_change_in_production';
      const token = jwt.sign(
        { id: 1, username: 'admin2010' },
        JWT_SECRET,
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
