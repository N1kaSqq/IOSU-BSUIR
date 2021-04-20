const { Router } = require('express');
const router = new Router();
checkController =  require('../controllers/checkController');

/*  /api/checks/ */

router.post('/', checkController.create);
router.get('/', checkController.getAll);
router.get('/:id', checkController.getCheckById);

module.exports = router;