const { Router } = require('express');
const router = new Router();

const checkRouter = require('./checkRouter');
const userRouter = require('./userRouter');
const departmentRouter = require('./departmentRouter');
const productRouter = require('./productRouter');
const supplierRouter = require('./supplierRouter');

/* /api/ */

router.use('/users', userRouter);
router.use('/checks', checkRouter);
router.use('/departments', departmentRouter);
router.use('/products', productRouter);
router.use('/suppliers', supplierRouter);

module.exports = router;