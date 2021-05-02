const { Product, Department } = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res) {
        try {
            let { name, price, purchaseСost, amount, departmentId, supplierId} = req.body;
            if (req.files && req.files.img) {
                const { img } = req.files;
                let fileName = uuid.v4() + '.jpg';
                img.mv(path.resolve(__dirname, '..', 'static', fileName));

                const product = await Product.create({
                    name,
                    price,
                    purchaseСost,
                    amount,
                    departmentId,
                    supplierId,
                    img: fileName,
                });
                return res.json(product);
            }

            const product = await Product.create({
                name,
                price,
                purchaseСost,
                amount,
                departmentId,
                supplierId,
            });
            return res.json(product);

        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res) {
        const {departmentId, orderBy} = req.query
        console.log(orderBy);

        if (departmentId && departmentId!== 'all') {
            if (orderBy === 'default') {
                const products = await Product.findAll({
                    where: {departmentId},
                    include: [{model: Department, as: 'department'}],
                });
                return res.json(products);
            }
            const products = await Product.findAll({
                where: {departmentId},
                include: [{model: Department, as: 'department'}],
                order: [['price', orderBy]],
            });
            return res.json(products);
        }

        if (orderBy!== 'default') {
            const products = await Product.findAll({
                include: [{model: Department, as: 'department'}],
                order: [['price', orderBy]],
            });
            return res.json(products);
        }

        const products = await Product.findAll({
            include: [{model: Department, as: 'department'}]
        });
        return res.json(products);
    }

    async getProductById(req, res) {
        
    }

    async updateProduct() {

    }

    async delete(req, res) {
        
    }
}

module.exports = new ProductController();