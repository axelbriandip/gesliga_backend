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
    // block code
})

const deleteUser = catchAsync(async(req, res,next) => {
    // block code
})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}