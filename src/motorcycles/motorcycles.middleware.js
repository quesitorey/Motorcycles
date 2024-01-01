const AppError = require("../common/errors/appError");
const { catchAsync } = require("../common/errors/catchAsync");
const MotorcyclesServices = require("./motorcycles.service");

const validateExistMotorcycle = catchAsync(async(req, res, next) => {
    const {id} = req.params

    const moto = await MotorcyclesServices.findOne(id)

    if(!moto) {
        return next(new AppError(`Motorcycle with id ${id} not found`, 404))
    }

    req.moto = moto
    next()
})

module.exports = {validateExistMotorcycle}