const getMessage = require('../utils/messages.js');

class BadRequestError extends Error {
  constructor(message = getMessage('WRONG_PARAMS_IN_REQUEST')) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
