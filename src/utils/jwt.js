const jwt = require('jsonwebtoken');

// Solo { sub, role } en el payload: nada más.
const signToken = (user) =>
  jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

module.exports = { signToken };
