const { catchAsync } = require("../common/errors/catchAsync")
const UsersServices = require("./users.services")
const AppError = require('../common/errors/appError')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const {envs} = require('../config/environments/environments')


//validar si un usuario existe
const validateExistUser = catchAsync(async(req, res, next) => {
    const {id} = req.params

    const user = await UsersServices.findOne(id)

    if(!user){
        return next(new AppError(`User with id ${id} not found`, 404))
    }

    req.user = user
    next()
})

const protect = catchAsync(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) {
        return next(new AppError('You are not logged in. Please login to get access', 401))
    }

    const decode = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED)

    const user = await UsersServices.findOne(decode.id)

    if(!user) next(new AppError('The owner of this token is no longer availbale', 401))


    req.sessionUser = user
    next()
})

const protectAccountOwner = (req, res, next) => {
    const { user, sessionUser } = req

    if(user.id !== sessionUser.id) next(new AppError('you do not own this account', 401))

    next()
}

const restrictTo = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.sessionUser.role)){
            return next(new AppError('you do not have permission to perform this action', 403))
        }

        next()
    }
}
module.exports = {
    validateExistUser, 
    restrictTo,
    protect,
    protectAccountOwner
}