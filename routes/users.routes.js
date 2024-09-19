const express = require('express')

const { getAllUsers } = require('../controllers/users.controller')

// insert middlewares

const usersRouter = express.Router()

usersRouter.get('/', getAllUsers)

module.exports = { usersRouter }