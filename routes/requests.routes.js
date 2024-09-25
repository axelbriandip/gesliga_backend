const express = require('express')

const {
    createRequest,
    deleteRequest,
    getAllRequests,
    getRequest,
    updateRequest
} = require('../controllers/requests.controller')

// insert middlewares

const requestsRouter = express.Router()

requestsRouter.get('/', getAllRequests)
requestsRouter.get('/:id', getRequest)
requestsRouter.post('/', createRequest)
requestsRouter.put('/update/:id', updateRequest)
requestsRouter.put('/delete/:id', deleteRequest) // soft delete

module.exports = { requestsRouter }