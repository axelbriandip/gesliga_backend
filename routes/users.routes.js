const express = require('express')

const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser
} = require('../controllers/users.controller')

// insert middlewares

const usersRouter = express.Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUser)
usersRouter.post('/', createUser)
usersRouter.put('/update/:id', updateUser)
usersRouter.put('/delete/:id', deleteUser) // soft delete

module.exports = { usersRouter }