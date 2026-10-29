const express = require('express');
const controller = require('../controllers/contacts.controller');
const { validateContact } = require('../validators/contacts.validators');
const requireClientId = require('../middlewares/requireClientId');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

// Ninguna ruta de contactos es pública
router.use(verifyToken);

// Las rutas específicas ANTES de las que tienen parámetros
router.get('/stats/summary', requireClientId, controller.stats);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateContact, controller.create);
router.put('/:id', validateContact, controller.update);
router.patch('/:id/favorite', controller.toggleFavorite);
router.delete('/:id', checkRole('manager', 'admin'), controller.remove);

module.exports = router;
