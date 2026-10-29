const express = require('express');
const controller = require('../controllers/contacts.controller');
const { validateContact } = require('../validators/contacts.validators');
const requireClientId = require('../middlewares/requireClientId');
const validateApiKey = require('../middlewares/validateApiKey');

const router = express.Router();

// Las rutas específicas ANTES de las que tienen parámetros
router.get('/stats/summary', requireClientId, controller.stats);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateContact, controller.create);
router.put('/:id', validateContact, controller.update);
router.patch('/:id/favorite', controller.toggleFavorite);
router.delete('/:id', validateApiKey, controller.remove);

module.exports = router;