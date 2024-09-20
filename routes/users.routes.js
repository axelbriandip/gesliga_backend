const express = require('express')

const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser
} = require('../controllers/users.controller')

const { userExists } = require('../middlewares/users.middleware')
const {
    protectAdmin,
    protectSession,
    protectUsersAccount
} = require('../middlewares/auth.middleware')

const usersRouter = express.Router()

usersRouter.post('/', createUser) // sign up
// insert endpoint login

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.get('/', protectAdmin, getAllUsers)
usersRouter.get('/:id', userExists, getUser)
usersRouter.put('/update/:id', userExists, protectUsersAccount, updateUser)
usersRouter.put('/delete/:id', userExists, protectUsersAccount, deleteUser) // soft delete

module.exports = { usersRouter }