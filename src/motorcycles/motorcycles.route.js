const express = require('express')
const { findAll, create, findOne, update, deleteMoto } = require('./motorcycles.controller.js')
const { validateExistMotorcycle } = require('./motorcycles.middleware.js')
const { restrictTo, protect } = require('../users/users.middleware.js')


const router = express.Router()


//POST
router.post('/motorcycles', create)
router.use(protect)
//GETALL
router.get('/motorcycles', restrictTo('employee'),  findAll)
//GETONE
router.route('/motorcycles/:id')
    .get( restrictTo('employee'), validateExistMotorcycle, findOne)
    .patch(restrictTo('employee'), validateExistMotorcycle, update)
//DELETE
    .delete(restrictTo('employee'), validateExistMotorcycle, deleteMoto)

module.exports = router