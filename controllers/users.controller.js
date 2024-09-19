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

module.exports = {
    getAllUsers
}