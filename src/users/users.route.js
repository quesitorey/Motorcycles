const express = require('express')
const { findAll, create, findOne, update, deleteUser } = require('./users.controller')

const router = express.Router()

//GET
router.get('/users', findAll)

//POST
router.post('/users', create)

//GETONE
router.get('/users/:id', findOne)

//UPDATE
router.patch('/users/:id', update)

//DELETE
router.delete('/users/:id', deleteUser)

module.exports = router