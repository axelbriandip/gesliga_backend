const express = require('express')

const {
    createNotification,
    deleteNotification,
    getNotification,
    updateNotification,
    getAllNotifications
} = require('../controllers/notifications.controller')

// insert middlewares

const notificationsRouter = express.Router()

notificationsRouter.get('/', getAllNotifications)
notificationsRouter.get('/:id', getNotification)
notificationsRouter.post('/', createNotification)
notificationsRouter.put('/update/:id', updateNotification)
notificationsRouter.put('/delete/:id', deleteNotification) // soft delete

module.exports = { notificationsRouter }