const express = require('express')

const {
    createFinal,
    deleteFinal,
    getAllFinals,
    getFinal,
    updateFinal
} = require('../controllers/finals.controller')

// insert middlewares

const finalsRouter = express.Router()

finalsRouter.get('/', getAllFinals)
finalsRouter.get('/:id', getFinal)
finalsRouter.post('/', createFinal)
finalsRouter.put('/update/:id', updateFinal)
finalsRouter.put('/delete/:id', deleteFinal) // soft delete

module.exports = { finalsRouter }