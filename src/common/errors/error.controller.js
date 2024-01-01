const AppError = require("./appError")
const { Error } = require("./error.model")

const handleCastError23505 = () => new AppError('Duplicated field value. Please write another value', 400)

const handleCastError22P02 = () => new AppError('Invalid datatype in database', 400)

const handleJWTExpiredError = () => new AppError('Your token has expired, please login again', 401)

const handleJWTError = () => new AppError('invalid token')

// const sendErrorDev = (err, res) => {
//     return res.status(err.statusCode).json({
//         status: err.status,
//         message: err.message,
//         err
//     })
// }

const sendErrorProd = async(err, res) => {
    await Error.create({
        status: err.status,
        message: err.message,
        stack: err.stack
    })
console.log(err)
    if(err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }else{
        console.log('Error💣:', err)
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong!!'
        })
    }
}

const globalErrorHandler = (err, req, res, next) => {
    let error = err

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'fail'

    if(err.parent?.code === '23505') error = handleCastError23505()
    if(err.parent?.code === '22P02') error = handleCastError22P02()
    if(err.name === 'TokenExpiredError') error = handleJWTExpiredError()
    sendErrorProd(err, res)
    if(err.name === 'JsonWebTokenExpired') error = handleJWTError()
    
}

module.exports = {
    globalErrorHandler
}