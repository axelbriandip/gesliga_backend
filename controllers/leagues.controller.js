const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { League } = require('../models/league.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getLeague = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const league = await League.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!league) {
        return res.status(404).json({
            status: 'error',
            message: 'League not found'
        });
    }

    // response
    res.status(200).json({
        status: 'success',
        data: { league }
    });
})

const createLeague = catchAsync(async(req, res,next) => {
    // receive data
    const {
        full_name,
        short_name,
        foundation_date,
        description,
        address,
        city,
        state,
        country,
        phone_number,
        email_address,
        instagram,
        facebook,
        whatsapp,
        website,
        primary_color,
        secondary_color
    } = req.body
        
    // create resource
    const newLeague = await League.create({
        full_name,
        short_name,
        foundation_date,
        description,
        address,
        city,
        state,
        country,
        phone_number,
        email_address,
        instagram,
        facebook,
        whatsapp,
        website,
        primary_color,
        secondary_color
    })

    res.status(201).json({
        status: 'success',
        data: { newLeague }
    })
})

const updateLeague = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const leagueToUpdate = await League.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!leagueToUpdate) {
        return res.status(404).json({
            status: 'error',
            message: 'League not found'
        });
    }

    // receive data
    const {
        full_name,
        short_name,
        foundation_date,
        description,
        address,
        city,
        state,
        country,
        phone_number,
        email_address,
        instagram,
        facebook,
        whatsapp,
        website,
        primary_color,
        secondary_color
    } = req.body
    
    // update
    const leagueUpdated = await leagueToUpdate.update({
        full_name: full_name || playerToUpdate.full_name,
        short_name: short_name || playerToUpdate.short_name,
        foundation_date: foundation_date || playerToUpdate.foundation_date,
        description: description || playerToUpdate.description,
        address: address || playerToUpdate.address,
        city: city || playerToUpdate.city,
        state: state || playerToUpdate.state,
        country: country || playerToUpdate.country,
        phone_number: phone_number || playerToUpdate.phone_number,
        email_address: email_address || playerToUpdate.email_address,
        instagram: instagram || playerToUpdate.instagram,
        facebook: facebook || playerToUpdate.facebook,
        whatsapp: whatsapp || playerToUpdate.whatsapp,
        website: website || playerToUpdate.website,
        primary_color: primary_color || playerToUpdate.primary_color,
        secondary_color: secondary_color || playerToUpdate.secondary_color
    })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { leagueUpdated }
    });
})

const deleteLeague = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const leagueToDelete = await League.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!leagueToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'League not found'
        });
    }

    // soft delete
    const leagueDeleted = await leagueToDelete.update({ is_active: false })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { leagueDeleted }
    });
})

module.exports = {
    createLeague,
    updateLeague,
    deleteLeague,
    getLeague
}