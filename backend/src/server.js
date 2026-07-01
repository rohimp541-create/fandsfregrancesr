const http = require('http');
const { Server } = require('socket.io');
const createApp = require('./app');
const config = require('./config/env');
const setupSocket = require('./socket/socketHandler');
const logger = require('./utils/logger');

async function startServer() {
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

  server.listen(config.port, () => {
    logger.info(`F&S Fragrances server running on http://localhost:${config.port}`);
    logger.info(`Storefront: http://localhost:${config.port}/`);
    logger.info(`Admin Panel: http://localhost:${config.port}/manage-fs-7465/login.html`);
    logger.info(`API: http://localhost:${config.port}/api/health`);
    logger.info('Database-backed admin initialization is disabled for this emergency storefront mode.');
  });
}

startServer().catch((err) => {
  logger.error('Failed to start server', err);
  process.exit(1);
});
