const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database/database')

const Motorcycles = sequelize.define('motorcycles', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        type: DataTypes.INTEGER
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE
    },  
    motorsNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('cancelled', 'pending', 'completed'),
        defaultValue: 'pending'
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Motorcycles