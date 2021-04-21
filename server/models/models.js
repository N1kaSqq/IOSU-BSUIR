const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contractNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATE,
    },
    employmentDate: {
        type: DataTypes.DATE,
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "USER",
    }
});

const Department = sequelize.define('department', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    maxWorkers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
    },
    maxGoods: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 500,
    },
    img: {
        type: DataTypes.STRING,
    }
});

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
    },
    purchaseСost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
    },
    img: {
        type: DataTypes.STRING,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
});

const Check = sequelize.define('check', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

const Supplier = sequelize.define('suppliers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    }
});

const ProductCheck = sequelize.define('product_check', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }
});

User.belongsTo(Department);
Department.hasMany(User);

Product.belongsTo(Department);
Department.hasMany(Product);

Product.belongsTo(Supplier);
Supplier.hasMany(Product);

Check.belongsTo(User);
User.hasMany(Check);

Product.belongsToMany(Check, { through: ProductCheck });
Check.belongsToMany(Product, { through: ProductCheck });

module.exports = {
    User,
    Department,
    Product,
    Check,
    Supplier,
    ProductCheck,
};
