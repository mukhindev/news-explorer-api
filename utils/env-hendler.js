require('dotenv').config();

module.exports = () => {
  const {
    NODE_ENV = 'development',
    PORT = 3000,
    MONGODB_URL = 'mongodb://localhost:27017/newsexplorerdb',
    TOKEN_SECRET_KEY = 'token-secret-key',
  } = process.env;

  if (NODE_ENV === 'production') {
    if (!process.env.MONGODB_URL) throw new Error('В режиме production обязательно MONGODB_URL в .env');
    if (!process.env.TOKEN_SECRET_KEY) throw new Error('В режиме production обязательно TOKEN_SECRET_KEY в .env');
  }

  return {
    PORT,
    TOKEN_SECRET_KEY,
    MONGODB_URL,
  };
};
