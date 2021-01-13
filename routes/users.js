const router = require('express').Router();

const {
  getUserByToken,
} = require('../controllers/users.js');

router.get('/me', getUserByToken);

module.exports = router;
