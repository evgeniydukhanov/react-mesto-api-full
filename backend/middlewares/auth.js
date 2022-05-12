const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
require('dotenv').config();

const { JWT_SECRET_KEY = 'test' } = process.env;
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const cookieAuthorization = req.cookies.jwt;
  // console.log(cookieAuthorization);
  if (!cookieAuthorization) {
    return next(new AuthorizationError('Ошибка авторизации'));
  }
  let payload;
  try {
    payload = jwt.verify(cookieAuthorization, JWT_SECRET_KEY);
  } catch (err) {
    return next(new AuthorizationError('Ошибка авторизации'));
  }
  req.user = payload;
  return next();
};
