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
        .then(() => res.status(200).send({ message: 'Пользователь успешно создан' }))
        .catch((e) => {
          if (e.name === 'MongoServerError' && e.code === 11000) {
            const err = new Error('Пользователь с данным email уже существует');
            err.statusCode = 409;

            next(err);
          }
          const err = new Error('Ошибка. Переданы некорректные данные');
          if (e.name === 'ValidationError') {
            err.statusCode = 400;
          }
          next(err);
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
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        const err = new Error('Ошибка, пользователь не найден');
        err.statusCode = 404;

        next(err);
      }
      return res.status(200).send({ email, name });
    })
    .catch((e) => {
      const err = new Error('Ошибка. Переданы некорректные данные');
      if (e.name === 'ValidationError') {
        err.statusCode = 400;
      }

      next(err);
    });
};
