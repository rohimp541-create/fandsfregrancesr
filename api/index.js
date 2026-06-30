const createApp = require('../backend/src/app');
const { initDatabase } = require('../backend/src/config/database');
const Admin = require('../backend/src/models/Admin');
const Setting = require('../backend/src/models/Setting');
const config = require('../backend/src/config/env');

let dbInitialized = false;

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
