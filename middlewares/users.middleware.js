// models
const { User } = require('../models/user.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

// midd userExists
const userExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] }
    })

    // if user doesn't exist, send instance AppError
    if (!user) {
        return next(new AppError('User not found', 404));
    }

    req.user = user;
    next();
})

// export
module.exports = { userExists };