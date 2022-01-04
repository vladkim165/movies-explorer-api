const Movie = require('../models/movie');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const id = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: id,
  })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new Error('Ошибка. Переданы некорректные данные');
        err.statusCode = 400;
        next(err);
      } else {
        next(e);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  const id = req.user._id;
  Movie.find({ owner: id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        const err = new Error('Ошибка. Фильм не найден');
        err.statusCode = 404;
        next(err);
      }
      if (!movie.owner.equals(userId)) {
        const err = new Error('Ошибка. Фильм не сохранён в вашем профиле');
        err.statusCode = 403;

        next(err);
      }
      return Movie.findByIdAndRemove(req.params.id)
        .then(() => res.status(200).send(`Фильм успешно удален: ${{ message: movie }}`));
    })
    .catch((e) => {
      const err = new Error('Ошибка. Переданы некорректные данные');
      if (e.name === 'CastError') {
        err.statusCode = 400;
      }
      next(err);
    });
};
