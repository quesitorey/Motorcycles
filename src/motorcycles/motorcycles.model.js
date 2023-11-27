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

    status: {
        type: DataTypes.ENUM('cancelled', 'pending', 'completed'),
        defaultValue: 'pending',
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    }
})

module.exports = Motorcycles