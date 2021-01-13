const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const {
  createArticle,
  getArticles,
  deleteArticle,
} = require('../controllers/articles.js');

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required().isoDate(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value, helpers) => {
      if (!isURL(value)) return helpers.error('Невалидная ссылка');
      return value;
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (!isURL(value)) return helpers.error('Невалидная ссылка');
      return value;
    }),
    owner: Joi.string().hex().length(24),
  }),
}), createArticle);

router.get('/', getArticles);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
}), deleteArticle);

module.exports = router;
