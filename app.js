const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/error-handler.js');
const routes = require('./routes');
const envHandler = require('./utils/env-hendler.js');

const { PORT, MONGODB_URL } = envHandler();

const app = express();

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
