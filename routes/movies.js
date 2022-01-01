const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

const isUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation error');
};

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required().min(1).max(30),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(2).max(30),
    image: Joi.string().required().custom(isUrl),
    trailer: Joi.string().required().custom(isUrl),
    thumbnail: Joi.string().required().custom(isUrl),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    movieId: Joi.string().hex().length(24),
  }),
}), createMovie);

router.get('/', getMovies);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
