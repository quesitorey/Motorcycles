const express = require("express")
const motorcycles = require('./motorcycles/motorcycles.route')
const users = require('./users/users.route')
const { globalErrorHandler } = require("./common/errors/error.controller")
const { protect } = require("./users/users.middleware")

// const calculateRequestTime = (req, res, next) => {
//     const requestTime = new Date().toISOString()
//     req.requestTime = requestTime
//     next()
// }


const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/api/v1', users)

app.use('/api/v1',motorcycles)

app.use(globalErrorHandler)

module.exports = app