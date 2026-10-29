const { body, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

const contactRules = [
  body('name')
    .isString().withMessage('name debe ser texto')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('name debe tener entre 2 y 50 caracteres'),

  body('phone')
    .isString().withMessage('phone debe ser texto')
    .trim()
    .matches(/^[\d\s\-()+]+$/).withMessage('phone solo admite dígitos, espacios, guiones, paréntesis y +')
    .isLength({ min: 7, max: 20 }).withMessage('phone debe tener entre 7 y 20 caracteres'),

  body('email')
    .optional()
    .isEmail().withMessage('email no es válido'),

  body('category')
    .optional()
    .isIn(['family', 'friends', 'work', 'other'])
    .withMessage('category debe ser: family, friends, work u other'),

  body('favorite')
    .optional()
    .isBoolean({ strict: true }).withMessage('favorite debe ser true o false'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((e) => e.msg).join('; ');
    return next(new AppError(message, 400));
  }
  next();
};

// Un arreglo de middlewares: primero reglas, luego revisión
const validateContact = [...contactRules, handleValidation];

module.exports = { validateContact };