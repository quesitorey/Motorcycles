const express = require('express')
const { findAll, findOne, update, deleteUser, register, login } = require('./users.controller')
const { validateExistUser, protect, restrictTo, protectAccountOwner } = require('./users.middleware')

const router = express.Router()


router.post('/users/register', register)

router.post('/users/login', login)

router.use(protect)
//POST
router.get('/users', findAll)

//router.post('/users', create)
router.route('/users/:id')
    .get(restrictTo('employee'), validateExistUser, findOne)
    .patch(validateExistUser, protectAccountOwner, update)
    .delete(validateExistUser, protectAccountOwner,  deleteUser)

module.exports = router