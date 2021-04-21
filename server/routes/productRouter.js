const { Router } = require('express');
const router = new Router();
productController = require('../controllers/productController');
const checkRole = require('../middleware/CheckRoleMiddleware');

/*  /api/products/ */

router.post('/', checkRole('ADMIN'), productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getProductById);
router.delete('/:id', checkRole('ADMIN'), productController.delete);
router.put('/:id', checkRole('ADMIN'), productController.updateProduct);

module.exports = router;