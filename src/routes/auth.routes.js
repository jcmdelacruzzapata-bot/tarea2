const express = require('express');
const rateLimit = require('express-rate-limit');
const controller = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../validators/auth.validators');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// 5 intentos FALLIDOS cada 15 minutos por IP (los exitosos no cuentan)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skipSuccessfulRequests: true,
  message: { error: 'Demasiados intentos de login, intenta de nuevo en 15 minutos' },
});

router.post('/register', validateRegister, controller.register);
router.post('/login', loginLimiter, validateLogin, controller.login);
router.get('/me', verifyToken, controller.me);

module.exports = router;
