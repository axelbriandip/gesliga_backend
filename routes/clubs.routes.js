const express = require('express')

const {
    createClub,
    deleteClub,
    getAllClubs,
    getClub,
    updateClub
} = require('../controllers/clubs.controller')

// insert middlewares

const clubsRouter = express.Router()

clubsRouter.get('/', getAllClubs)
clubsRouter.get('/:id', getClub)
clubsRouter.post('/', createClub)
clubsRouter.put('/update/:id', updateClub)
clubsRouter.put('/delete/:id', deleteClub) // soft delete

module.exports = { clubsRouter }