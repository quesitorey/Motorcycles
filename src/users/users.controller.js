const UsersServices = require('./users.services')

const findAll = async(req, res) => {
    const { requestTime } = req
    const users = await UsersServices.findAll()

    return res.status(201).json({
        requestTime,
        users
    })
}

const create = async(req, res) => {
    const { requestTime } = req
    const { name, email, password, role } = req.body

    const users = await UsersServices.create({ name, email, password, role })

    return res.status(201).json({
        requestTime,
        users
    })
}

const findOne = async(req, res) => {
    const { id } = req.params
    const { requestTime } = req

    const user = await UsersServices.findOne(id)

    if(!user){
        return res.status(404).json({
            message: `User with id ${id} not found`
        })
    }

    return res.status(201).json({
        requestTime,
        user
    })
}

const update = async(req, res) => {
    const { id } = req.params
    const { requestTime } = req
    const { name, email, password, role } = req.body

    const user = await UsersServices.findOne(id)

    if(!user){
        return res.status(404).json({
            message: `User with id ${id} not found`
        })
    }

    const updatedUser = UsersServices.update(user, { name, email, password, role })

    return res.status(201).json({
        requestTime,
        updatedUser
    })
}

const deleteUser = async(req, res) => {
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
}

module.exports = {
    findAll,
    create,
    findOne,
    update,
    deleteUser
}