const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allowedOrigins = require('./middlewares/cors');
const router = require('./routes/index');

const { PORT = 3000, moviesData = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();

router.use(express.json());
router.use(express.urlencoded({
  extended: true,
}));
router.use(cookieParser());
router.use(requestLogger);

router.use(allowedOrigins);
mongoose.connect(moviesData);

app.use(router);

router.use(errorLogger);

router.use(errors());

router.use(errorHandler);

app.listen(PORT);
