const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { User } = require('../models/user.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getAllUsers = catchAsync(async(req, res, next) => {
    const users = await User.findAll({ where: { is_active: true } })

    res.status(200).json({
        status: 'success',
        data: { users }
    })
})

const getUser = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const user = await User.findOne({ where: { id, is_active: true } });

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
        phone_number
    })

    newUser.password = undefined

    res.status(201).json({
        status: 'success',
        data: { newUser }
    })
})

const login = catchAsync(async (req, res, next) => {
	// Get email and password from req.body
	const { username, password } = req.body;

	// Validate if the user exist with given username
	const user = await User.findOne({ where: { username, is_active: true } });

	// Compare passwords (entered password vs db password)
	// If user doesn't exists or passwords doesn't match, send error
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new AppError('Usuario y/o contraseña incorrectos', 401));
	}

	// Remove password from response
	user.password = undefined;

	// Generate JWT (payload, secretOrPrivateKey, options)
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1m' });
    
	res.status(200).json({
        status: 'success',
        data: { user, token },
	});
});

const updateUser = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const userToUpdate = await User.findOne({ where: { id, is_active: true } });

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
        phone_number
    } = req.body
    
    // encrypt password
    let hashedPassword = userToUpdate.password;
    if (password) {
        const salt = await bcrypt.genSalt(12);
        hashedPassword = await bcrypt.hash(password, salt);
    }

    // update
    const userUpdated = await userToUpdate.update({
        username: username || userToUpdate.username,
        password: hashedPassword,
        email: email || userToUpdate.email,
        first_name: first_name || userToUpdate.first_name,
        last_name: last_name || userToUpdate.last_name,
        role: role || userToUpdate.role,
        phone_number: phone_number || userToUpdate.phone_number
    })

    userUpdated.password = undefined

    // user updated
    res.status(200).json({
        status: 'success',
        data: { userUpdated }
    });
})

const deleteUser = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const userToDelete = await User.findOne({ where: { id, is_active: true } });

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
    getUser,
    login
}