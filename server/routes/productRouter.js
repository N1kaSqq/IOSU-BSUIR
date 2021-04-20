const { Router } = require('express');
const router = new Router();
productController = require('../controllers/productController');

/*  /api/products/ */

router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.delete);
router.put('/:id', productController.updateProduct);

module.exports = router;