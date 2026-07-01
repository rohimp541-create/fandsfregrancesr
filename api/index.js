const createApp = require('../backend/src/app');

module.exports = async (req, res) => {
  const app = createApp();
  return app(req, res);
};
