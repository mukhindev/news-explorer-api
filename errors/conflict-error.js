const getMessage = require('../utils/messages.js');

class ConflictError extends Error {
  constructor(message = getMessage('WAS_CONFLICT')) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
