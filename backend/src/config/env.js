require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbType: (process.env.DB_TYPE || 'sqlite').toLowerCase(),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fs_fragrances',
    sqlitePath: process.env.SQLITE_PATH || 'data/store.db',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin2010',
    password: process.env.ADMIN_PASSWORD || '746522AF',
  },
  corsOrigin: process.env.CORS_ORIGIN || '*',
};
