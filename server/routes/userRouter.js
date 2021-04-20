const { Router } = require('express');
const router = new Router();
const userController = require('../controllers/userController');

/*  /api/users/ */

router.post('/register', userController.registration);
router.post('/login', userController.login);
router.get('/isAuth', userController.check);
router.get('/', userController.getAll);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUserById);
router.put('/:id', userController.updateUser);


module.exports = router;