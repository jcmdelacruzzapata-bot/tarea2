const AppError = require('../utils/AppError');

const validateApiKey = (req, res, next) => {
  if (req.header('x-api-key') !== 'talendig-123') {
    return next(new AppError('API key inválida o ausente', 401));
  }
  next();
};

module.exports = validateApiKey;