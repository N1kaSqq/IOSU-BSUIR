const { Router } = require('express');
const router = new Router();
departmentController = require ('../controllers/departmentController');
/*  /api/departments/ */

router.post('/', departmentController.create);
router.get('/', departmentController.getAll);
router.get('/:id', departmentController.getDepartmentById);
router.delete('/:id', departmentController.delete);
router.put('/:id', departmentController.updateDepartment);

module.exports = router;