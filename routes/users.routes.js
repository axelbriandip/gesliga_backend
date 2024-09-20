const express = require('express')

const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser
} = require('../controllers/users.controller')

// const { userExists } = require('../middlewares/users.middleware')
// const {
//     protectAdmin,
//     protectSession,
//     protectUsersAccount
// } = require('../middlewares/auth.middleware')

const usersRouter = express.Router()

usersRouter.post('/', createUser) // sign up
// insert endpoint login

// Protecting below endpoints
// usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUser)
usersRouter.put('/update/:id', updateUser)
usersRouter.put('/delete/:id', deleteUser) // soft delete

module.exports = { usersRouter }