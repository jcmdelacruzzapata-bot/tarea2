const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const verifyToken = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header || !header.startsWith('Bearer ')) {
    return next(new AppError('Token requerido', 401));
  }

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    next(new AppError('Token inválido o expirado', 401));
  }
};

module.exports = verifyToken;
