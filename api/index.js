const fs = require('fs');
const path = require('path');

// 1. Copy the SQLite database to /tmp if it doesn't exist
// This is required because Vercel serverless environment has a read-only filesystem,
// but /tmp is writeable, allowing SQLite to run queries and insert orders/settings.
const srcDb = path.join(process.cwd(), 'backend/store.db');
const destDb = '/tmp/store.db';

if (!fs.existsSync(destDb)) {
  try {
    fs.copyFileSync(srcDb, destDb);
    console.log('Database copied to /tmp/store.db successfully');
  } catch (err) {
    console.error('Failed to copy database:', err.message);
  }
}

// 2. Set the SQLite path environment variable to point to /tmp
process.env.SQLITE_PATH = destDb;
process.env.DB_TYPE = 'sqlite';

// 3. Import Express App and database config
const createApp = require('../backend/src/app');
const { initDatabase } = require('../backend/src/config/database');
const Admin = require('../backend/src/models/Admin');
const Setting = require('../backend/src/models/Setting');
const config = require('../backend/src/config/env');

let dbInitialized = false;

// 4. Serverless request handler function
module.exports = async (req, res) => {
  if (!dbInitialized) {
    await initDatabase();
    await Admin.ensureDefaultAdmin(config.admin.username, config.admin.password);
    await Setting.ensureDefaultSettings();
    dbInitialized = true;
  }
  const app = createApp();
  return app(req, res);
};
