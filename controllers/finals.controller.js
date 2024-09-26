const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { Final } = require('../models/final.model')
const { Club } = require('../models/club.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getAllFinals = catchAsync(async(req, res, next) => {
    const finals = await Final.findAll({
        where: { is_active: true },
        include: [
            {
                model: Club,
                as: 'ChampionClub',
                attributes: ['id', 'full_name', 'short_name', 'abb_name']
            },
            {
                model: Club,
                as: 'RunnerUpClub',
                attributes: ['id', 'full_name', 'short_name', 'abb_name']
            }
        ]
    })

    res.status(200).json({
        status: 'success',
        data: { finals }
    })
})

const getFinal = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const final = await Final.findOne({
        where: { id, is_active: true },
        include: [
            {
                model: Club,
                as: 'ChampionClub',
                attributes: ['id', 'full_name', 'short_name', 'abb_name']
            },
            {
                model: Club,
                as: 'RunnerUpClub',
                attributes: ['id', 'full_name', 'short_name', 'abb_name']
            }
        ]
    });

    // if not exists
    if (!final) {
        return res.status(404).json({
            status: 'error',
            message: 'Final not found'
        });
    }

    // response
    res.status(200).json({
        status: 'success',
        data: { Final }
    });
})

const createFinal = catchAsync(async(req, res,next) => {
    // receive data
    const {
        title,
        season,
        description,
        award_date,
        goals_champion,
        goals_runner_up,
        penalties_champion,
        penalties_runner_up,
        champion_club_id,
        runner_up_club_id
    } = req.body
    
    // create resource
    const newFinal = await Final.create({
        title,
        season,
        description,
        award_date,
        goals_champion,
        goals_runner_up,
        penalties_champion,
        penalties_runner_up,
        champion_club_id,
        runner_up_club_id
    })

    res.status(201).json({
        status: 'success',
        data: { newFinal }
    })
})

const updateFinal = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const finalToUpdate = await Final.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!finalToUpdate) {
        return res.status(404).json({
            status: 'error',
            message: 'Final not found'
        });
    }

    // receive data
    const {
        title,
        season,
        description,
        award_date,
        goals_champion,
        goals_runner_up,
        penalties_champion,
        penalties_runner_up,
        champion_club_id,
        runner_up_club_id
    } = req.body
    
    // update
    const finalUpdated = await finalToUpdate.update({
        title: title || finalToUpdate.title,
        season: season || finalToUpdate.season,
        description: description || finalToUpdate.description,
        award_date: award_date || finalToUpdate.award_date,
        goals_champion: goals_champion || finalToUpdate.goals_champion,
        goals_runner_up: goals_runner_up || finalToUpdate.goals_runner_up,
        penalties_champion: penalties_champion || finalToUpdate.penalties_champion,
        penalties_runner_up: penalties_runner_up || finalToUpdate.penalties_runner_up,
        champion_club_id: champion_club_id || finalToUpdate.champion_club_id,
        runner_up_club_id: runner_up_club_id || finalToUpdate.runner_up_club_id,
    })

    // champion updated
    res.status(200).json({
        status: 'success',
        data: { finalUpdated }
    });
})

const deleteFinal = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const finalToDelete = await Final.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!finalToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'Final not found'
        });
    }

    // soft delete
    const finalDeleted = await finalToDelete.update({ is_active: false })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { finalDeleted }
    });
})

module.exports = {
    getAllFinals,
    createFinal,
    updateFinal,
    deleteFinal,
    getFinal
}