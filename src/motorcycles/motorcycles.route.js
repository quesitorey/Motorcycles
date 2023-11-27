const express = require('express')
const { findAll, create, findOne, update, deleteMoto } = require('./motorcycles.controller.js')


const router = express.Router()

//GETALL
router.get('/motorcycles', findAll)

//POST
router.post('/motorcycles', create)
//GETONE
router.get('/motorcycles/:id', findOne)
//UPDATE
router.patch('/motorcycles/:id', update)
//DELETE
router.delete('/motorcycles/:id', deleteMoto)

module.exports = router