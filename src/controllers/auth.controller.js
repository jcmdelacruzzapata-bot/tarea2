const bcrypt = require('bcryptjs');
const users = require('../data/users.data');
const { signToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body; // OJO: no se lee req.body.role

  if (users.findByEmail(email)) {
    return next(new AppError('El email ya está registrado', 409));
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = users.create({ name, email, passwordHash }); // role = 'member'

  res.status(201).json({ user: users.toPublic(user), token: signToken(user) });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = users.findByEmail(email);
  const ok = user && (await bcrypt.compare(password, user.passwordHash));
  // Mismo mensaje si el email no existe o la contraseña no coincide
  if (!ok) return next(new AppError('Credenciales inválidas', 401));

  res.status(200).json({ user: users.toPublic(user), token: signToken(user) });
};

exports.me = (req, res, next) => {
  const user = users.findById(req.user.id);
  if (!user) return next(new AppError('Usuario no encontrado', 404));
  res.status(200).json(users.toPublic(user));
};
