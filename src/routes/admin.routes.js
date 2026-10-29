const express = require('express');
const controller = require('../controllers/admin.controller');
const { validateRole } = require('../validators/auth.validators');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

// Protege TODAS las rutas de este router (verifyToken siempre antes que checkRole)
router.use(verifyToken, checkRole('admin'));

router.get('/users', controller.listUsers);
router.patch('/users/:id/role', validateRole, controller.updateRole);

module.exports = router;
