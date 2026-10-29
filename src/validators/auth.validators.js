const { body } = require('express-validator');
const { handleValidation } = require('./contacts.validators');

const registerRules = [
  body('name')
    .isString().withMessage('name debe ser texto')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('name debe tener entre 2 y 50 caracteres'),

  body('email')
    .isString().withMessage('email debe ser texto')
    .trim()
    .isEmail().withMessage('email no es válido'),

  body('password')
    .isString().withMessage('password debe ser texto')
    .isLength({ min: 6 }).withMessage('password debe tener al menos 6 caracteres'),
];

const loginRules = [
  body('email')
    .isString().withMessage('email debe ser texto')
    .trim()
    .isEmail().withMessage('email no es válido'),

  body('password')
    .isString().withMessage('password debe ser texto')
    .notEmpty().withMessage('password es obligatorio'),
];

const roleRules = [
  body('role')
    .isIn(['member', 'manager', 'admin'])
    .withMessage('role debe ser: member, manager o admin'),
];

module.exports = {
  validateRegister: [...registerRules, handleValidation],
  validateLogin: [...loginRules, handleValidation],
  validateRole: [...roleRules, handleValidation],
};
