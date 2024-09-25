const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { Sanction } = require('../models/sanction.model')
const { Club } = require('../models/club.model')
const { Player } = require('../models/player.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getAllSanctions = catchAsync(async(req, res, next) => {
    const sanction = await Sanction.findAll({
        where: { is_active: true },
        include: [
            {
                model: Player,
                as: 'player',
                attributes: ['id', 'first_name', 'last_name', 'license_number']
            },
            {
                model: Club,
                as: 'club',
                attributes: ['id', 'full_name', 'short_name', 'abb_name']
            }
        ]
    })

    res.status(200).json({
        status: 'success',
        data: { sanction }
    })
})

const getSanction = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const sanction = await Sanction.findOne({
        where: { id, is_active: true },
        include: [
            {
                model: Player,
                as: 'player',
                attributes: ['id', 'first_name', 'last_name', 'license_number']
            },
            {
                model: Club,
                as: 'club',
                attributes: ['id', 'full_name', 'short_name', 'abb_name']
            }
        ]
    });

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
        type: type || sanctionToUpdate.type,
        target: target || sanctionToUpdate.target,
        reason: reason || sanctionToUpdate.reason,
        description: description || sanctionToUpdate.description,
        issue_date: issue_date || sanctionToUpdate.issue_date,
        start_date: start_date || sanctionToUpdate.start_date,
        end_date: end_date || sanctionToUpdate.end_date,
        status: status || sanctionToUpdate.status,
        amount: amount || sanctionToUpdate.amount,
        severity: severity || sanctionToUpdate.severity,
        player_id: player_id || sanctionToUpdate.player_id,
        club_id: club_id || sanctionToUpdate.club_id,
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