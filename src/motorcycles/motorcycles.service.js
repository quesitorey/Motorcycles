const Motorcycles = require('./motorcycles.model')

class MotorcyclesServices {
    static async findAll(){
        return await Motorcycles.findAll({
            where: {
                status: "pending"
            }
        })
    }

    static async create(data){
        return await Motorcycles.create(data)
    }

    static async findOne(id){
        return await Motorcycles.findOne({
            where: {
                id,
                status: "pending"
            }
        })
    }

    static async update(moto, data){
        return await moto.update(data)
    }

    static async deleteMoto(moto){
        return await moto.update({
            status: 'cancelled'
        })
    }
}

module.exports = MotorcyclesServices
