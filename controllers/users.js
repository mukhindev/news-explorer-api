const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BadRequestError, ConflictError } = require('../errors');
const User = require('../models/user.js');
const envHandler = require('../utils/env-hendler.js');
const getMessage = require('../utils/messages.js');

const { TOKEN_SECRET_KEY } = envHandler();

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    const userWithoutPassword = user;
    userWithoutPassword.password = '';
    return res.send({ user: userWithoutPassword });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError());
    }
    if (error.name === 'MongoError' && error.code === 11000) {
      return next(new ConflictError(getMessage('ALREADY_REGISTERED')));
    }
    return next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      TOKEN_SECRET_KEY,
      { expiresIn: '7d' },
    );
    return res.send({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports.getUserByToken = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const user = await User.findById(userId);
    return res.send({ user });
  } catch (error) {
    return next(error);
  }
};
