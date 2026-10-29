const users = require('../data/users.data');
const AppError = require('../utils/AppError');

exports.listUsers = (req, res) => {
  res.status(200).json(users.findAll().map(users.toPublic));
};

exports.updateRole = (req, res, next) => {
  const user = users.findById(Number(req.params.id));
  if (!user) return next(new AppError('Usuario no encontrado', 404));

  user.role = req.body.role;
  res.status(200).json(users.toPublic(user));
};
