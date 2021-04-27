const ApiError = require('../error/ApiError');
const { User, Department } = require('../models/models');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { model } = require('../db');

const generateJWT = (id, email, role, name, contractNumber) => {
    return JWT.sign(
        { id, email, role, name, contractNumber },
        process.env.SECRET_KEY,
        {
            expiresIn: '24h',
        });
};

class UserController {
    async registration(req, res, next) {
        try {
            const {
                email,
                password,
                name,
                phoneNumber,
                contractNumber,
                birthDate,
                employmentDate,
                salary,
                departmentId,
                role
            } = req.body;
    
            if (!email || !password || !contractNumber) {
                return next(ApiError.badRequest('Некорректный email или пароль'));
            }
    
            // добавить проверку contractNumber кастомным селектом
    
            const candidate = await User.findOne({
                where: {
                    email,
                },
            });
    
            if (candidate) {
                return next(ApiError.badRequest('Данный пользователь уже существует'));
            }
    
            const hashPassword = await bcrypt.hash(password, 8);
            const user = await User.create({
                email,
                role,
                password: hashPassword,
                name,
                phoneNumber,
                contractNumber,
                birthDate,
                employmentDate,
                salary,
                departmentId,
            });

            const token = generateJWT(user.id, user.email, user.role, user.name, user.contractNumber);

            return res.json({token});
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async login(req, res, next) {
        const {contractNumber, password} = req.body;

        let user = await User.findOne({
            where: {
                contractNumber: contractNumber
            }
        });

        if (!user) {
            return next(ApiError.badRequest('Пользователя с таким email не сущестует'));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль'));
        }

        const token = generateJWT(user.id, user.email, user.role, user.name, user.contractNumber);

        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role, req.user.name, req.user.contractNumber);
        return res.json({token});
    }

    async getAll(req, res, next) {
        const {departmentId, orderBy} = req.query
        console.log(orderBy);

        if (departmentId && departmentId!== 'all') {
            if (orderBy === 'default') {
                const users = await User.findAll({
                    where: {departmentId},
                    include: [{model: Department, as: 'department'}],
                });
                return res.json(users);
            }
            const users = await User.findAll({
                where: {departmentId},
                include: [{model: Department, as: 'department'}],
                order: [['name', orderBy]],
            });
            return res.json(users);
        }

        if (orderBy!== 'default') {
            const users = await User.findAll({
                include: [{model: Department, as: 'department'}],
                order: [['name', orderBy]],
            });
            return res.json(users);
        }

        const users = await User.findAll({
            include: [{model: Department, as: 'department'}]
        });
        return res.json(users);
    }

    async getUserById(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(ApiError.badRequest('Некорректный запрос'));
        }
        const user = await User.findOne({
            where: {
                id
            },
            include: [{model: Department, as: 'department'}]
        });

        res.json(user);
    }

    async deleteUserById(req, res, next) {
        
    }

    async updateUser(req, res, next) {

    }
}

module.exports = new UserController();