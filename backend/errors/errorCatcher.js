module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'произошла ошибка' : message });
  console.log(message);
  next();
};
