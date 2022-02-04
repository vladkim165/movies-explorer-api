const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((data) => res.status(200).send({ message: data }))
        .catch((e) => {
          if (e.code === 11000) {
            const err = new Error('Пользователь с данным email уже существует');
            err.statusCode = 409;
            next(err);
          }
          if (e.name === 'ValidationError') {
            const err = new Error('Ошибка. Переданы некорректные данные');
            err.statusCode = 400;
            next(err);
          } else {
            next(e);
          }
        });
    });
};

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const err = new Error('Ошибка, пользователь не найден');
        err.statusCode = 404;

        next(err);
      }
      const {
        email,
        name,
      } = user;
      return res.status(200).send({
        email,
        name,
      });
    })
    .catch((e) => {
      const err = new Error('Ошибка. Переданы некорректные данные');
      if (e.name === 'CastError') {
        err.statusCode = 400;
      }

      next(err);
    });
};

module.exports.editProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const err = new Error('Ошибка, пользователь не найден');
        err.statusCode = 404;

        next(err);
      }
      return User.findByIdAndUpdate(req.user._id, { email, name }, {
        new: true,
        runValidators: true,
      })
        .then((updatedUser) => res.status(200).send(updatedUser));
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new Error('Ошибка. Переданы некорректные данные');
        err.statusCode = 400;
        next(err);
      }
      if (e.code === 11000) {
        const err = new Error('Ошибка, неверная почта');
        err.statusCode = 409;

        next(err);
      } else {
        next(e);
      }
    });
};
