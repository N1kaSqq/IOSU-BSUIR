const { Router } = require('express');
const router = new Router();
const supplierController = require('../controllers/supplierController');

/*  /api/suppliers/ */

router.post('/', supplierController.create);
router.get('/', supplierController.getAll);
router.delete('/:id', supplierController.delete);

module.exports = router;