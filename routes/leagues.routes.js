const express = require('express')

const {
    createLeague,
    deleteLeague,
    getLeague,
    updateLeague
} = require('../controllers/leagues.controller')

// insert middlewares

const leaguesRouter = express.Router()

leaguesRouter.get('/:id', getLeague)
leaguesRouter.post('/', createLeague)
leaguesRouter.put('/update/:id', updateLeague)
leaguesRouter.put('/delete/:id', deleteLeague) // soft delete

module.exports = { leaguesRouter }