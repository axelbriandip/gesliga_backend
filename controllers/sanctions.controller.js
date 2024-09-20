const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { Sanction } = require('../models/sanction.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getAllSanctions = catchAsync(async(req, res, next) => {
    const sanction = await Sanction.findAll({ where: { is_active: true } })

    res.status(200).json({
        status: 'success',
        data: { sanction }
    })
})

const getSanction = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const sanction = await Sanction.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!sanction) {
        return res.status(404).json({
            status: 'error',
            message: 'Sanction not found'
        });
    }

    // response
    res.status(200).json({
        status: 'success',
        data: { sanction }
    });
})

const createSanction = catchAsync(async(req, res,next) => {
    // receive data
    const {
        type,
        target,
        reason,
        description,
        issue_date,
        start_date,
        end_date,
        status,
        amount,
        severity,
        player_id,
        club_id
    } = req.body
        
    // create resource
    const newSanction = await Sanction.create({
        type,
        target,
        reason,
        description,
        issue_date,
        start_date,
        end_date,
        status,
        amount,
        severity,
        player_id,
        club_id
    })

    res.status(201).json({
        status: 'success',
        data: { newSanction }
    })
})

const updateSanction = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const sanctionToUpdate = await Sanction.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!sanctionToUpdate) {
        return res.status(404).json({
            status: 'error',
            message: 'Sanction not found'
        });
    }

    // receive data
    const {
        type,
        target,
        reason,
        description,
        issue_date,
        start_date,
        end_date,
        status,
        amount,
        severity,
        player_id,
        club_id
    } = req.body
    
    // update
    const sanctionUpdated = await sanctionToUpdate.update({
        type: type || userToUpdate.type,
        target: target || userToUpdate.target,
        reason: reason || userToUpdate.reason,
        description: description || userToUpdate.description,
        issue_date: issue_date || userToUpdate.issue_date,
        start_date: start_date || userToUpdate.start_date,
        end_date: end_date || userToUpdate.end_date,
        status: status || userToUpdate.status,
        amount: amount || userToUpdate.amount,
        severity: severity || userToUpdate.severity,
        player_id: player_id || userToUpdate.player_id,
        club_id: club_id || userToUpdate.club_id,
    })

    // sanction updated
    res.status(200).json({
        status: 'success',
        data: { sanctionUpdated }
    });
})

const deleteSanction = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const sanctionToDelete = await Sanction.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!sanctionToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'Sanction not found'
        });
    }

    // soft delete
    const sanctionDeleted = await sanctionToDelete.update({ is_active: false })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { sanctionDeleted }
    });
})

module.exports = {
    getAllSanctions,
    createSanction,
    updateSanction,
    deleteSanction,
    getSanction
}