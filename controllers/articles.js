const { ForbiddenError, NotFoundError } = require('../errors');
const Article = require('../models/article.js');
const getMessage = require('../utils/messages.js');

module.exports.createArticle = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const {
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    } = req.body;
    const article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: userId,
    });
    return res.send({ article });
  } catch (error) {
    return next(error);
  }
};

module.exports.getArticles = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const articles = await Article.find({ owner: userId });
    return res.send({ articles });
  } catch (error) {
    return next(error);
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { _id: userId } = req.user;
    const article = await Article.findById(articleId).select('+owner');
    if (!article) return next(new NotFoundError(getMessage('CARD_NOT_FOUND')));
    if (article.owner.toString() !== userId) {
      return next(new ForbiddenError(getMessage('CANNOT_DELETE_NON_OWN_CARD')));
    }
    article.remove();
    return res.send({ article });
  } catch (error) {
    return next(error);
  }
};
