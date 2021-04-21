const { Router } = require('express');
const router = new Router();
checkController =  require('../controllers/checkController');
const authMiddleware = require('../middleware/AuthMiddleware');

/*  /api/checks/ */

router.post('/', authMiddleware, checkController.create);
router.get('/', checkController.getAll);
router.get('/:id', checkController.getCheckById);

module.exports = router;