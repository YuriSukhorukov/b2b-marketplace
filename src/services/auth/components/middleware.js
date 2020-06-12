const validate = (req, res, next) => {
  console.log('auth middleware');
  return next();
};

module.exports = {
  validate
}
