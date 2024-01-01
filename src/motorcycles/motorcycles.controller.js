const { catchAsync } = require('../common/errors/catchAsync')
const MotorcyclesServices = require('./motorcycles.service')


const findAll = catchAsync(async(req, res) => {
    const { requestTime } = req
    const motorcycles = await MotorcyclesServices.findAll()
    return res.status(201).json({
        requestTime,
        motorcycles
    })
})


const create = catchAsync(async(req, res) => {
    const { date, status, motorsNumber, userId } = req.body

    const motorcycles = await MotorcyclesServices.create({date, status, motorsNumber, userId})

    return res.status(201).json({
        data: motorcycles
    })
})

const findOne = catchAsync(async(req, res) => {
    const { id } = req.params

    const motorcycle = await MotorcyclesServices.findOne(id)

    if(!motorcycle){
        return res.status(404).json({
            message: `Repair with id ${id} not found`
        })
    }

    return res.status(201).json({
        motorcycle
    })
})

const update = catchAsync(async(req, res) => {

    const { id } = req.params
    const { date, status, motorsNumber, userId } = req.body

    const motorcycle = await MotorcyclesServices.findOne(id)

    if(!motorcycle){
        return res.status(404).json({
            message: `Repair with id ${id} not found`
        })
    }

    const updatedMoto =  MotorcyclesServices.update(motorcycle, { date, status, motorsNumber, userId })

    return res.status(201).json({
        updatedMoto
    })
})


const deleteMoto = catchAsync(async(req, res) => {
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
        motorcycle
    })
})

module.exports = {
    findAll,
    create,
    findOne,
    update, 
    deleteMoto
}