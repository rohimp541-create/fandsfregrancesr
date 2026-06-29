const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/env');
const apiRoutes = require('./routes');
const requestLogger = require('./middleware/requestLogger');
const { notFound, errorHandler } = require('./middleware/errorHandler');

function createApp() {
  const app = express();
  const projectRoot = path.join(__dirname, '../..');

  app.use(cors({ origin: config.corsOrigin === '*' ? true : config.corsOrigin }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true' || process.env.VERCEL === true;
  const uploadsPath = isVercel
    ? '/tmp/uploads'
    : path.join(__dirname, '../uploads');
  app.use('/uploads', express.static(uploadsPath));
  app.use('/api', apiRoutes);

  app.use(express.static(projectRoot));

  app.get('/', (_req, res) => {
    res.sendFile(path.join(projectRoot, 'index.html'));
  });

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
