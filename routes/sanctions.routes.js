const express = require('express')

const {
    createSanction,
    deleteSanction,
    getAllSanctions,
    getSanction,
    updateSanction
} = require('../controllers/sanctions.controller')

// insert middlewares

const sanctionsRouter = express.Router()

sanctionsRouter.get('/', getAllSanctions)
sanctionsRouter.get('/:id', getSanction)
sanctionsRouter.post('/', createSanction)
sanctionsRouter.put('/update/:id', updateSanction)
sanctionsRouter.put('/delete/:id', deleteSanction) // soft delete

module.exports = { sanctionsRouter }