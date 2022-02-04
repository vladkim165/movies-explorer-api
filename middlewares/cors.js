// const allowedCors = [
//   'https://movies-explorer-prod.nomoredomains.rocks',
//   'http://movies-explorer-prod.nomoredomains.rocks',
//   'https://api.movies-explorer-prod.nomoredomains.rocks',
//   'http://api.movies-explorer-prod.nomoredomains.rocks',
//   'http://localhost/3000',
// ];

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // if (allowedCors.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', origin);
  // }

  res.header('Access-Control-Allow-Credentials', true);

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    const requestHeaders = req.headers['access-control-request-headers'];
    res.header('Access-Control-Allow-Methods', requestHeaders);

    // удалить после разработки
    res.header('Access-Control-Allow-Origin', origin);

    return res.end();
  }

  res.header('Access-Control-Allow-Origin', origin);

  return next();
};
