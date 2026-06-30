const jwt = require('jsonwebtoken');
const { asyncHandler } = require('../middleware/errorHandler');

// Unified JWT secret — identical to auth.js middleware
const JWT_SECRET = process.env.JWT_SECRET || 'fs_fragrances_jwt_secret_key_2026_change_in_production';

const authController = {
  login: asyncHandler(async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }

    // Hardcoded admin credentials — clean bypass, signed with unified JWT_SECRET
    if (username === 'admin2010' && password === '746522AF') {
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

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials.',
    });
  }),

  verify: asyncHandler(async (req, res) => {
    // req.admin is populated by authenticateToken middleware
    res.json({
      success: true,
      data: { admin: req.admin },
    });
  }),
};

module.exports = authController;
