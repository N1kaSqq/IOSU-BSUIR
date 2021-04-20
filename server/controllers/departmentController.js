const { Department } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const { getAll } = require('./userController');

class DepartmentController {
    async create(req, res, next) {
        try {
            let { name, maxWorkers, maxGoods} = req.body;
            if (req.files && req.files.img) {
                const { img } = req.files;
                let fileName = uuid.v4() + '.jpg';
                img.mv(path.resolve(__dirname, '..', 'static', fileName));

                const department = await Department.create({
                    name,
                    maxWorkers,
                    maxGoods,
                    img: fileName,
                });
                return res.json(department);
            }

            const department = await Department.create({
                name,
                maxWorkers,
                maxGoods,
            });
            return res.json(department);

        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res) {
        const departments = await Department.findAll();
        return res.json(departments);
    }

    async getDepartmentById(req, res) {
        
    }

    async updateDepartment() {
        
    }

    async delete(req, res) {
        const { id } = req.params;
        const department = await Department.findOne({
            where: {
                id,
            },
        });
        if (department) {
            await department.destroy();
        }

        const departments = await Department.findAll();

        res.json(departments);
    }
}

module.exports = new DepartmentController();