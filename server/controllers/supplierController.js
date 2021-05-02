const { Supplier } = require('../models/models');
const ApiError = require('../error/ApiError');

class SupplierController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const supplier = await Supplier.create({
                name,
            });
            return res.json(supplier);

        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res) {
        const suppliers = await Supplier.findAll();
        return res.json(suppliers);
    }

    async delete(req, res) {
        
    }
}

module.exports = new SupplierController();