const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('../config/env');
const { asyncHandler } = require('../middleware/errorHandler');

const authController = {
  login: asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }

    if (username !== 'admin2010' || password !== '746522AF') {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    const admin = { id: 1, username: 'admin2010' };

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      config.jwt.secret || 'fs_fragrances_jwt_secret_key_2026_change_in_production',
      { expiresIn: config.jwt.expiresIn || '24h' }
    );

    res.json({
      success: true,
      data: {
        token,
        admin: { id: admin.id, username: admin.username },
      },
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
