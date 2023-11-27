const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database/database')

const Users = sequelize.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('client', 'employee'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'not available'),
        defaultValue: 'available'
    }
})

module.exports = Users