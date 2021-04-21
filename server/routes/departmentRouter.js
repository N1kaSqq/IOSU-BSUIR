const { Router } = require('express');
const router = new Router();
departmentController = require ('../controllers/departmentController');
const checkRole = require('../middleware/CheckRoleMiddleware');
/*  /api/departments/ */

router.post('/', checkRole('ADMIN'), departmentController.create);
router.get('/', departmentController.getAll);
router.get('/:id', departmentController.getDepartmentById);
router.delete('/:id', checkRole('ADMIN'), departmentController.delete);
router.put('/:id', checkRole('ADMIN'), departmentController.updateDepartment);

module.exports = router;