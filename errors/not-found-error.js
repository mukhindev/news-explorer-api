const getMessage = require('../utils/messages.js');

class NotFoundError extends Error {
  constructor(message = getMessage('NOT_FOUND')) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
