const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { Pass } = require('../models/pass.model')
const { Club } = require('../models/club.model')
const { Player } = require('../models/player.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getAllPasses = catchAsync(async(req, res, next) => {
    const passes = await Pass.findAll({ where: { is_active: true } })

    res.status(200).json({
        status: 'success',
        data: { passes }
    })
})

const getPass = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const pass = await Pass.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!pass) {
        return res.status(404).json({
            status: 'error',
            message: 'Pass not found'
        });
    }

    // response
    res.status(200).json({
        status: 'success',
        data: { pass }
    });
})

const createPass = catchAsync(async(req, res,next) => {
    // receive data
    const {
        start_date,
        end_date,
        club_id,
        player_id
    } = req.body
        
    // create resource
    const newPass = await Pass.create({
        start_date,
        end_date,
        club_id,
        player_id
    })

    res.status(201).json({
        status: 'success',
        data: { newPass }
    })
})

const updatePass = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const passToUpdate = await Pass.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!passToUpdate) {
        return res.status(404).json({
            status: 'error',
            message: 'Pass not found'
        });
    }

    // receive data
    const {
        start_date,
        end_date,
        club_id,
        player_id
    } = req.body
    
    // update
    const passUpdated = await passToUpdate.update({
        start_date: start_date || passToUpdate.start_date,
        end_date: end_date || passToUpdate.end_date,
        club_id: club_id || passToUpdate.club_id,
        player_id: player_id || passToUpdate.player_id,
    })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { passUpdated }
    });
})

const deletePass = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const passToDelete = await Pass.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!passToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'Pass not found'
        });
    }

    // soft delete
    const passDeleted = await passToDelete.update({ is_active: false })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { passDeleted }
    });
})

module.exports = {
    getAllPasses,
    createPass,
    updatePass,
    deletePass,
    getPass
}