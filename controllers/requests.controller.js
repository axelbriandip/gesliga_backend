const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { Request } = require('../models/request.model')
const { User } = require('../models/user.model')
const { Player } = require('../models/player.model')
const { Club } = require('../models/club.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getAllRequests = catchAsync(async(req, res, next) => {
    const requests = await Request.findAll({
        where: { is_active: true },
        include: [
            {
                model: User,
                as: 'creator',
                attributes: ['id', 'first_name', 'last_name']
            },
            {
                model: Player,
                as: 'player',
                attributes: ['id', 'first_name', 'last_name', 'license_number']
            },
            {
                model: Club,
                as: 'originClub',
                attributes: ['id', 'full_name', 'short_name', 'abb_name']
            },
            {
                model: Club,
                as: 'destinationClub',
                attributes: ['id', 'full_name', 'short_name', 'abb_name']
            }
        ]
    })

    res.status(200).json({
        status: 'success',
        data: { requests }
    })
})

const getRequest = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const request = await Request.findOne({
        where: { id, is_active: true },
        include: [
            {
                model: User,
                as: 'creator',
                attributes: ['id', 'first_name', 'last_name']
            },
            {
                model: Player,
                as: 'player',
                attributes: ['id', 'first_name', 'last_name', 'license_number']
            },
            {
                model: Club,
                as: 'originClub',
                attributes: ['id', 'full_name', 'short_name', 'abb_name']
            },
            {
                model: Club,
                as: 'destinationClub',
                attributes: ['id', 'full_name', 'short_name', 'abb_name']
            }
        ]
    });

    // if not exists
    if (!request) {
        return res.status(404).json({
            status: 'error',
            message: 'Request not found'
        });
    }

    // response
    res.status(200).json({
        status: 'success',
        data: { request }
    });
})

const createRequest = catchAsync(async(req, res,next) => {
    // receive data
    const {
        type,
        status,
        notes,
        created_by,
        player_id,
        origin_club_id,
        destination_club_id
    } = req.body
    
    // create resource
    const newRequest = await Request.create({
        type,
        status,
        notes,
        created_by,
        player_id,
        origin_club_id,
        destination_club_id
    })

    res.status(201).json({
        status: 'success',
        data: { newRequest }
    })
})

const updateRequest = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const requestToUpdate = await Request.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!requestToUpdate) {
        return res.status(404).json({
            status: 'error',
            message: 'Request not found'
        });
    }

    // receive data
    const {
        type,
        status,
        notes,
        created_by,
        player_id,
        origin_club_id,
        destination_club_id
    } = req.body
    
    // update
    const requestUpdated = await requestToUpdate.update({
        type: type || requestToUpdate.type,
        status: status || requestToUpdate.status,
        notes: notes || requestToUpdate.notes,
        created_by: created_by || requestToUpdate.created_by,
        player_id: player_id || requestToUpdate.player_id,
        origin_club_id: origin_club_id || requestToUpdate.origin_club_id,
        destination_club_id: destination_club_id || requestToUpdate.destination_club_id,
    })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { requestUpdated }
    });
})

const deleteRequest = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const requestToDelete = await Request.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!requestToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'Request not found'
        });
    }

    // soft delete
    const requestDeleted = await requestToDelete.update({ is_active: false })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { requestDeleted }
    });
})

module.exports = {
    getAllRequests,
    createRequest,
    updateRequest,
    deleteRequest,
    getRequest
}