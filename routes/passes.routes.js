const express = require('express')

const {
    createPass,
    deletePass,
    getAllPasses,
    getPass,
    updatePass
} = require('../controllers/passes.controller')

// insert middlewares

const passesRouter = express.Router()

passesRouter.get('/', getAllPasses)
passesRouter.get('/:id', getPass)
passesRouter.post('/', createPass)
passesRouter.put('/update/:id', updatePass)
passesRouter.put('/delete/:id', deletePass) // soft delete

module.exports = { passesRouter }