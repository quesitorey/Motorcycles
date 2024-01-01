const { DataTypes } = require('sequelize')
const { sequelize } = require('../../config/database/database')

const Error = sequelize.define('error', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    stack: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

module.exports = { Error }