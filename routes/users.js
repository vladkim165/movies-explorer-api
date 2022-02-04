const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  editProfile,
} = require('../controllers/users');

router.get('/profile', getUser);

router.patch('/profile', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), editProfile);

module.exports = router;
