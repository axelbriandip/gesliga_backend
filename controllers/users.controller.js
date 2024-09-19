const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { User } = require('../models/user.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getAllUsers = catchAsync(async(req, res, next) => {
    const users = await User.findAll()

    res.status(201).json({
        status: 'success',
        data: { users }
    })
})

const getUser = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const user = await User.findOne({ where: { id } });

    // if not exists
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    // response
    res.status(200).json({
        status: 'success',
        data: { user }
    });
})

const createUser = catchAsync(async(req, res,next) => {
    // receive data
    const {
        username,
        password,
        email,
        first_name,
        last_name,
        role,
        last_login,
        phone_number
    } = req.body
    
    // encrypt password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // create resource
    const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        first_name,
        last_name,
        role,
        last_login,
        phone_number
    })

    newUser.password = undefined

    res.status(201).json({
        status: 'success',
        data: { newUser }
    })
})

const updateUser = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const userToUpdate = await User.findOne({ where: { id } });

    // if not exists
    if (!userToUpdate) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    // receive data
    const {
        username,
        password,
        email,
        first_name,
        last_name,
        role,
        last_login,
        phone_number
    } = req.body
    
    // update
    const userUpdated = await userToUpdate.update({
        username: username || userToUpdate.username,
        password: password || userToUpdate.password,
        email: email || userToUpdate.email,
        first_name: first_name || userToUpdate.first_name,
        last_name: last_name || userToUpdate.last_name,
        role: role || userToUpdate.role,
        last_login: last_login || userToUpdate.last_login,
        phone_number: phone_number || userToUpdate.phone_number
    })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { userUpdated }
    });
})

const deleteUser = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const userToDelete = await User.findOne({ where: { id } });

    // if not exists
    if (!userToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    // soft delete
    const userDeleted = await userToDelete.update({ is_active: false })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { userDeleted }
    });
})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser
}