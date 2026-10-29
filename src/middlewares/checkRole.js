const AppError = require('../utils/AppError');

// Función que DEVUELVE un middleware (closure sobre "roles")
const checkRole = (...roles) => (req, res, next) => {
  if (!req.user) return next(new AppError('Token requerido', 401));
  if (!roles.includes(req.user.role)) return next(new AppError('No tienes permisos', 403));
  next();
};

module.exports = checkRole;
