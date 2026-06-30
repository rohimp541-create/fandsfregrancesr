const jwt = require('jsonwebtoken');
const config = require('../config/env');

// Single source of truth for JWT secret — must match api/index.js and authController.js
const JWT_SECRET = process.env.JWT_SECRET || 'fs_fragrances_jwt_secret_key_2026_change_in_production';

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Authentication token required.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    // ── Admin bypass: if this is the hardcoded admin, always allow ──────────
    if (decoded.username === 'admin2010') {
      return next();
    }
    // ────────────────────────────────────────────────────────────────────────
    next();
  } catch {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
}

module.exports = { authenticateToken };

