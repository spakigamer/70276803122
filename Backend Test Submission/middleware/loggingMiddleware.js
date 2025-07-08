const { log } = require('../logger/logger');

async function loggingMiddleware(req, res, next) {
  await log('backend', 'info', 'middleware', `Incoming ${req.method} request to ${req.url}`);
  next();
}
module.exports = { loggingMiddleware };
