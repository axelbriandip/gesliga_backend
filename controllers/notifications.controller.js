const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { Notification } = require('../models/notification_entry.model')
const { User } = require('../models/user.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getAllNotifications = catchAsync(async(req, res, next) => {
    const notifications = await Notification.findAll({
        where: { is_active: true },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'username', 'first_name', 'last_name']
            }
        ]
    })

    res.status(200).json({
        status: 'success',
        data: { notifications }
    })
})

const getNotification = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const notification = await Notification.findOne({
        where: { id, is_active: true },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'username', 'first_name', 'last_name']
            }
        ]
    });

    // if not exists
    if (!notification) {
        return res.status(404).json({
            status: 'error',
            message: 'Notification not found'
        });
    }

    // response
    res.status(200).json({
        status: 'success',
        data: { notification }
    });
})

const createNotification = catchAsync(async(req, res,next) => {
    // receive data
    const {
        title,
        message,
        type,
        user_id
    } = req.body
        
    // create resource
    const newNotification = await Notification.create({
        title,
        message,
        type,
        user_id
    })

    res.status(201).json({
        status: 'success',
        data: { newNotification }
    })
})

const updateNotification = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const notificationToUpdate = await Notification.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!notificationToUpdate) {
        return res.status(404).json({
            status: 'error',
            message: 'Notification not found'
        });
    }

    // receive data
    const {
        title,
        message,
        type,
        user_id
    } = req.body
    
    // update
    const notificationUpdated = await notificationToUpdate.update({
        title: title || notificationToUpdate.title,
        message: message || notificationToUpdate.message,
        type: type || notificationToUpdate.type,
        user_id: user_id || notificationToUpdate.user_id
    })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { notificationUpdated }
    });
})

const deleteNotification = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const notificationToDelete = await Notification.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!notificationToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'Notification not found'
        });
    }

    // soft delete
    const notificationDeleted = await notificationToDelete.update({ is_active: false })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { notificationDeleted }
    });
})

module.exports = {
    createNotification,
    updateNotification,
    deleteNotification,
    getNotification,
    getAllNotifications
}