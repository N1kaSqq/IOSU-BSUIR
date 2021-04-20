const ApiError = require('../error/ApiError');
const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

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
                }
            });
    
            if (candidate) {
                return next(ApiError.badRequest('Данный пользователь уже существует'));
            }
    
            const hashPassword = await bcrypt.hash(password, 6);
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
            
            const token = generateJWT(user.id, user.email, user.role, user.name);

            return res.json({token});
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async login(req, res, next) {
        
    }

    /* async check(req, res, next) {
       const { id } = req.query;
       if (!id) {
           return next(ApiError.badRequest('не задан id'));
       }
       res.json(id);
    } */

    async check(req, res, next) {
        
    }

    async getAll(req, res, next) {

    }

    async getUserById(req, res, next) {
        
    }

    async deleteUserById(req, res, next) {
        
    }

    async updateUser(req, res, next) {

    }
}

module.exports = new UserController();