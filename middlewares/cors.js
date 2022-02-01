const allowedCors = [
  'https://movies-explorer-prod.nomoredomains.rocks/',
  'http://movies-explorer-prod.nomoredomains.rocks/',
  'https://api.movies-explorer-prod.nomoredomains.rocks/',
  'http://api.movies-explorer-prod.nomoredomains.rocks/',
  'http://localhost',
];

module.exports = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['Access-Control-Request-Headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', requestHeaders);
    return res.end();
  }

  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  return next();
};
