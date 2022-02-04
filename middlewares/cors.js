const allowedCors = [
  'https://movies-explorer-prod.nomoredomains.rocks',
  'http://movies-explorer-prod.nomoredomains.rocks',
  'https://api.movies-explorer-prod.nomoredomains.rocks',
  'http://api.movies-explorer-prod.nomoredomains.rocks',
  'http://localhost/3000',
];

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Credentials');
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    const requestHeaders = req.headers['access-control-request-headers'];
    res.header('Access-Control-Allow-Methods', requestHeaders);
    // удалить после разработки
    res.header('Access-Control-Allow-Origin', origin);

    return res.end();
  }

  return next();
};
