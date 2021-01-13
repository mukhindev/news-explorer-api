const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const { UnauthorizedError } = require('../errors');
const getMessage = require('../utils/messages.js');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return isEmail(value);
      },
      message: (props) => `${props.value} не является email адресом!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

async function findUserByCredentials(email, password) {
  try {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return Promise.reject(new UnauthorizedError(getMessage('WRONG_LOGIN_OR_PASSWORD')));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return Promise.reject(new UnauthorizedError(getMessage('WRONG_LOGIN_OR_PASSWORD')));
    }
    return user;
  } catch (error) {
    return new Error();
  }
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
