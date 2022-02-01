const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, logout } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signout', logout);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.all('*', (_req, _res, next) => {
  const err = new Error('Запрашиваемый ресурс не найден');
  err.statusCode = 404;

  next(err);
});

module.exports = router;
