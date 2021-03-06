module.exports = (err, req, res, next) => {
  if (!(err.statusCode)) {
    res.status(500).send({ message: `На сервере произошла ошибка ${err.message}` });
  }
  res.status(err.statusCode).send({ message: err.message });
  next();
};
