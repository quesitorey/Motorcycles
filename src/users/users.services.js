const Users = require('./users.model')

class UsersServices {
    static async findAll() {
        return await Users.findAll({
            where: {
                status: 'available'
            }
        })
    }

    static async create(data) {
        return await Users.create(data)
    }

    static async findOne(id){
        return await Users.findOne({
            where: {
                id,
                status: 'available'
            }
        })
    }

    static async update(user, data){
        return await user.update(data)
    }

    static async deleteUser(user){
        return await user.update({
            status: 'not available'
        })
    }
}

module.exports = UsersServices