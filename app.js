const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allowedOrigins = require('./middlewares/cors');
const router = require('./routes/index');

const { PORT = 3000, moviesData = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(requestLogger);

app.use(allowedOrigins);
mongoose.connect(moviesData);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
