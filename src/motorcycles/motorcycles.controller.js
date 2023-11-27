const MotorcyclesServices = require('./motorcycles.service')


const findAll = async(req, res) => {
    const { requestTime } = req
    const motorcycles = await MotorcyclesServices.findAll()
    return res.status(201).json({
        requestTime,
        motorcycles
    })
}

const create = async(req, res) => {
    const { requestTime } = req

    const { date, status, userId } = req.body

    const motorcycles = await MotorcyclesServices.create({date, status, userId})

    return res.status(201).json({
        requestTime,
        data: motorcycles
    })
}

const findOne = async(req, res) => {
    const { requestTime } = req
    const { id } = req.params

    const motorcycle = await MotorcyclesServices.findOne(id)

    if(!motorcycle){
        return res.status(404).json({
            message: `Repair with id ${id} not found`
        })
    }

    return res.status(201).json({
        requestTime,
        motorcycle
    })
}

const update = async(req, res) => {
    const { requestTime } = req
    const { id } = req.params
    const { date, status, userId } = req.body

    const motorcycle = await MotorcyclesServices.findOne(id)

    if(!motorcycle){
        return res.status(404).json({
            message: `Repair with id ${id} not found`
        })
    }

    const updatedMoto =  MotorcyclesServices.update(motorcycle, { date, status, userId })

    return res.status(201).json({
        requestTime,
        updatedMoto
    })
}


const deleteMoto = async(req, res) => {
    const { id } = req.params
    const { requestTime } = req
    
    const moto = await MotorcyclesServices.findOne(id)

    const motorcycle =  MotorcyclesServices.deleteMoto(moto)

    if(!moto){
        return res.status(404).json({
            message: `Repair with id ${id} not found`
        })
    }

    return res.status(201).json({
        motorcycle,
        requestTime
    })
}

module.exports = {
    findAll,
    create,
    findOne,
    update, 
    deleteMoto
}