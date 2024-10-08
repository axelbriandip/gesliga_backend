const dotenv = require('dotenv')

dotenv.config()

const { AppError } = require('../utils/appError.util');

// envitorment dev or prod
const sendErrorDev = (error, req, res) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        error,
        stack: error.stack
    })
}

const sendErrorProd = (error, req, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message || 'Something went wrong!'
    })
}

// errors
const tokenExpiredError = () => { return new AppError('Session expired', 403) };
const tokenInvalidSignatureError = () => { return new AppError('Session invalid', 403) };
const dbUniqueConstraintError = () => { return new AppError('The entered email has already been token', 400) };
const imgLimitError = () => { return new AppError('You can only upload 3 images', 400) };

// handler
const globalErrorHandler = (error, req, res, next) => {
    // set defalt values for original error obj
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'fail';

    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(error, req, res);
    } else if(process.env.NODE_ENV === 'production') {
        let err = {  ...error };

        if(error.name === 'TokenExpiredError') err = tokenExpiredError();
        else if(error.name === 'JsonWebTokenError') err = tokenInvalidSignatureError();
        else if(error.name === 'SequelizeUniqueConstraintError') err = dbUniqueConstraintError();
        else if(error.name === 'LIMIT_UNEXPECTED_FILE') err = imgLimitError();

        sendErrorProd(err, req, res);
    }
}

module.exports = { globalErrorHandler };