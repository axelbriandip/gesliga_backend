const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { Champion } = require('../models/champion.model')
const { Club } = require('../models/club.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getAllChampions = catchAsync(async(req, res, next) => {
    const champions = await Champion.findAll({ where: { is_active: true } })

    res.status(200).json({
        status: 'success',
        data: { champions }
    })
})

const getChampion = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const champion = await Champion.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!champion) {
        return res.status(404).json({
            status: 'error',
            message: 'Champion not found'
        });
    }

    // response
    res.status(200).json({
        status: 'success',
        data: { champion }
    });
})

const createChampion = catchAsync(async(req, res,next) => {
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
    const newChampion = await Champion.create({
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
        data: { newChampion }
    })
})

const updateChampion = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const championToUpdate = await Champion.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!championToUpdate) {
        return res.status(404).json({
            status: 'error',
            message: 'Champion not found'
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
    const championUpdated = await championToUpdate.update({
        title: title || championToUpdate.title,
        season: season || championToUpdate.season,
        description: description || championToUpdate.description,
        award_date: award_date || championToUpdate.award_date,
        goals_champion: goals_champion || championToUpdate.goals_champion,
        goals_runner_up: goals_runner_up || championToUpdate.goals_runner_up,
        penalties_champion: penalties_champion || championToUpdate.penalties_champion,
        penalties_runner_up: penalties_runner_up || championToUpdate.penalties_runner_up,
        champion_club_id: champion_club_id || championToUpdate.champion_club_id,
        runner_up_club_id: runner_up_club_id || championToUpdate.runner_up_club_id,
    })

    // champion updated
    res.status(200).json({
        status: 'success',
        data: { championUpdated }
    });
})

const deleteChampion = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const championToDelete = await Champion.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!championToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'Champion not found'
        });
    }

    // soft delete
    const championDeleted = await championToDelete.update({ is_active: false })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { championDeleted }
    });
})

module.exports = {
    getAllChampions,
    createChampion,
    updateChampion,
    deleteChampion,
    getChampion
}