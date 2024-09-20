const express = require('express')

const {
    createChampion,
    deleteChampion,
    getAllChampions,
    getChampion,
    updateChampion
} = require('../controllers/champions.controller')

// insert middlewares

const championsRouter = express.Router()

championsRouter.get('/', getAllChampions)
championsRouter.get('/:id', getChampion)
championsRouter.post('/', createChampion)
championsRouter.put('/update/:id', updateChampion)
championsRouter.put('/delete/:id', deleteChampion) // soft delete

module.exports = { championsRouter }