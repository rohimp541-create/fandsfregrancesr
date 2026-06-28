const http = require('http');
const { Server } = require('socket.io');
const createApp = require('./app');
const config = require('./config/env');
const { initDatabase, getDbType } = require('./config/database');
const setupSocket = require('./socket/socketHandler');
const Admin = require('./models/Admin');
const Setting = require('./models/Setting');
const logger = require('./utils/logger');

async function startServer() {
  await initDatabase();
  logger.info(`Database type: ${getDbType()}`);

  const app = createApp();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: config.corsOrigin === '*' ? true : config.corsOrigin,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
  });

  setupSocket(io);
  app.set('io', io);

  await Admin.ensureDefaultAdmin(config.admin.username, config.admin.password);
  await Setting.ensureDefaultSettings();

  server.listen(config.port, () => {
    logger.info(`F&S Fragrances server running on http://localhost:${config.port}`);
    logger.info(`Storefront: http://localhost:${config.port}/`);
    logger.info(`Admin Panel: http://localhost:${config.port}/manage-fs-7465/login.html`);
    logger.info(`API: http://localhost:${config.port}/api/health`);
  });
}

startServer().catch((err) => {
  logger.error('Failed to start server', err);
  process.exit(1);
});
