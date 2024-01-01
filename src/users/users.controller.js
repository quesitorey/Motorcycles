const AppError = require('../common/errors/appError')
const { catchAsync } = require('../common/errors/catchAsync')
const { verifyPassword, encryptPassword } = require('../config/plugins/encripted-password')
const { validatePartialUser, validateUser, validateLogin } = require('./users.schema')
const { generateJWT } = require('../config/plugins/generate-jwt.plugin')
const UsersServices = require('./users.services')

const register = catchAsync(async(req, res, next) => {
    const {hasError, errorMessages, userData} = validateUser(req.body)

    if(hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }
    const user = await UsersServices.create(userData)

    return res.status(201).json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
})

const login = catchAsync(async(req,res,next) => {
    const { hasError, errorMessages, userData } = validateLogin(req.body)

    if(hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    //validar la existencia del usuario
    const user = await UsersServices.findOneByEmail(userData.email)

    if(!user){
        return next(new AppError('this account does not exist', 404))
    }
    const encrypt = (await encryptPassword(user.password)).toString()
    //comparar password
    const isCorrectPassword = await verifyPassword(userData.password, user.password)

    if(!isCorrectPassword) {
        console.log(userData.password)
        return next(new AppError('Incorrect email or password', 401))
    }

    //generar jwt
    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
})



const findAll = catchAsync(async(req, res) => {
   const users = await UsersServices.findAll()
   return res.status(200).json(users)
})

// const create = async(req, res) => {
//     const { requestTime } = req
//     const { name, email, password, role } = req.body

//     const users = await UsersServices.create({ name, email, password, role })

//     return res.status(201).json({
//         requestTime,
//         users
//     })
// }

const findOne = catchAsync(async(req, res, next) => {
    const { user } = req

    return res.status(201).json(user)
})

const update = catchAsync( async(req, res) => {
    
    const { user } = req
    const { hasError, errorMessages, userData} = validatePartialUser(req.body)

    const userUpdated = await UsersServices.update(user, userData)

    return res.status(201).json(userUpdated)
})

const deleteUser = catchAsync(async(req, res) => {
    const { requestTime } = req
    const { id } = req.params
    
    const user = await UsersServices.findOne(id)
    
    if(!user){
        return res.status(404).json({
            message: `User with id ${id} not found`
        })
    }

    const userDelete = UsersServices.deleteUser(user)

    return res.status(201).json({
        requestTime,
        userDelete
    })
})

module.exports = {
    findAll,
    // create,
    findOne,
    update,
    deleteUser,
    register,
    login
}