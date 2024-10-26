const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { Player } = require('../models/player.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getAllPlayers = catchAsync(async(req, res, next) => {
    const players = await Player.findAll({ where: { is_active: true } })

    res.status(200).json({
        status: 'success',
        data: { players }
    })
})

const getPlayer = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const player = await Player.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!player) {
        return res.status(404).json({
            status: 'error',
            message: 'Player not found'
        });
    }

    // response
    res.status(200).json({
        status: 'success',
        data: { player }
    });
})

const createPlayer = catchAsync(async(req, res,next) => {
    // receive data
    const {
        first_name,
        last_name,
        date_of_birth,
        dni,
        club_id
    } = req.body
    
    // create resource
    const newPlayer = await Player.create({
        first_name,
        last_name,
        date_of_birth,
        dni,
        club_id
    })

    res.status(201).json({
        status: 'success',
        data: { newPlayer }
    })
})

const updatePlayer = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const playerToUpdate = await Player.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!playerToUpdate) {
        return res.status(404).json({
            status: 'error',
            message: 'Player not found'
        });
    }

    // receive data
    const {
        first_name,
        last_name,
        date_of_birth,
        dni,
        club_id
    } = req.body
    
    // update
    const playerUpdated = await playerToUpdate.update({
        first_name: first_name || playerToUpdate.first_name,
        last_name: last_name || playerToUpdate.last_name,
        date_of_birth: date_of_birth || playerToUpdate.date_of_birth,
        dni: dni || playerToUpdate.dni,
        club_id: club_id || playerToUpdate.club_id,
    })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { playerUpdated }
    });
})

const deletePlayer = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const playerToDelete = await Player.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!playerToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'Player not found'
        });
    }

    // soft delete
    const playerDeleted = await playerToDelete.update({ is_active: false })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { playerDeleted }
    });
})

module.exports = {
    getAllPlayers,
    createPlayer,
    updatePlayer,
    deletePlayer,
    getPlayer
}