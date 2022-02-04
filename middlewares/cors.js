const allowedCors = [
  'https://movies-explorer-prod.nomoredomains.rocks',
  'http://movies-explorer-prod.nomoredomains.rocks',
  'https://api.movies-explorer-prod.nomoredomains.rocks',
  'http://api.movies-explorer-prod.nomoredomains.rocks',
  'http://localhost/3000',
];

module.exports = (req, res, next) => {
  if (allowedCors.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
