const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const router = express.Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, logout } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const allowedOrigins = require('../middlewares/cors');

router.use(express.json());
router.use(express.urlencoded({
  extended: true,
}));
router.use(cookieParser());
router.use(requestLogger);

router.use(allowedOrigins);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signout', logout);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.get('*', (_req, _res, next) => {
  const err = new Error('Запрашиваемый ресурс не найден');
  err.statusCode = 404;

  next(err);
});

router.use(errorLogger);

router.use(errors());

router.use(errorHandler);

module.exports = router;
