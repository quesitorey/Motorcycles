const express = require("express")
const motorcycles = require('./motorcycles/motorcycles.route')
const users = require('./users/users.route')

const calculateRequestTime = (req, res, next) => {
    const requestTime = new Date().toISOString()
    req.requestTime = requestTime
    next()
}


const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(calculateRequestTime)
app.use('/api/v1', motorcycles)
app.use('/api/v1', users)
module.exports = app