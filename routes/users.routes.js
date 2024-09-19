const express = require('express')

const {
    getAllUsers,
    createUser
} = require('../controllers/users.controller')

// insert middlewares

const usersRouter = express.Router()

usersRouter.get('/', getAllUsers)
usersRouter.post('/', createUser)

module.exports = { usersRouter }