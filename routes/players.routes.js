const express = require('express')

const {
    createPlayer,
    deletePlayer,
    getAllPlayers,
    getPlayer,
    updatePlayer
} = require('../controllers/players.controller')

// insert middlewares

const playersRouter = express.Router()

playersRouter.get('/', getAllPlayers)
playersRouter.get('/:id', getPlayer)
playersRouter.post('/', createPlayer)
playersRouter.put('/update/:id', updatePlayer)
playersRouter.put('/delete/:id', deletePlayer) // soft delete

module.exports = { playersRouter }