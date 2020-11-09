const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { NotFoundError } = require('../errors');
const auth = require('../middlewares/auth.js');
const { createUser, login } = require('../controllers/users.js');
const userRoutes = require('./users.js');
const articleRoutes = require('./articles.js');
const getMessage = require('../utils/messages.js');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(8).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use('/users', auth, userRoutes);
router.use('/articles', auth, articleRoutes);

router.all('*', (req, res, next) => {
  next(new NotFoundError(getMessage('HANDLE_NOT_FOUND')));
});

module.exports = router;
