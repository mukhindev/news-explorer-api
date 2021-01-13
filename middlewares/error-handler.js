const { CelebrateError } = require('celebrate');
const { BadRequestError } = require('../errors');
const getMessage = require('../utils/messages.js');

module.exports = (err, req, res, next) => {
  let error = err;
  if (error instanceof CelebrateError) error = new BadRequestError();
  const { statusCode = 500, message } = error;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? getMessage('SERVER_ERROR')
        : message,
    });
  return next();
};
