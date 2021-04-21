const { Router } = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/AuthMiddleware');
const checkRole = require('../middleware/CheckRoleMiddleware');

/*  /api/users/ */

router.post('/register', userController.registration);
router.post('/login', userController.login);
router.get('/isAuth', authMiddleware,  userController.check);
router.get('/', authMiddleware, userController.getAll);
router.get('/:id', authMiddleware, userController.getUserById);
router.delete('/:id', checkRole('ADMIN'), authMiddleware, userController.deleteUserById);
router.put('/:id', authMiddleware, userController.updateUser);


module.exports = router;