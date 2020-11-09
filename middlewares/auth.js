const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');
const envHandler = require('../utils/env-hendler.js');

const { TOKEN_SECRET_KEY } = envHandler();

module.exports = (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, TOKEN_SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError());
  }

  req.user = payload;
  return next();
};
