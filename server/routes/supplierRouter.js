const { Router } = require('express');
const router = new Router();
const supplierController = require('../controllers/supplierController');
const checkRole = require('../middleware/CheckRoleMiddleware');

/*  /api/suppliers/ */

router.post('/', checkRole('ADMIN'), supplierController.create);
router.get('/', supplierController.getAll);
router.delete('/:id', checkRole('ADMIN'), supplierController.delete);

module.exports = router;