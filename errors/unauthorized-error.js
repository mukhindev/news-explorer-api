const getMessage = require('../utils/messages.js');

class UnauthorizedError extends Error {
  constructor(message = getMessage('AUTHHORIZATION_REQUIRED')) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
