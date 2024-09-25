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
        full_name: full_name || leagueToUpdate.full_name,
        short_name: short_name || leagueToUpdate.short_name,
        foundation_date: foundation_date || leagueToUpdate.foundation_date,
        description: description || leagueToUpdate.description,
        address: address || leagueToUpdate.address,
        city: city || leagueToUpdate.city,
        state: state || leagueToUpdate.state,
        country: country || leagueToUpdate.country,
        phone_number: phone_number || leagueToUpdate.phone_number,
        email_address: email_address || leagueToUpdate.email_address,
        instagram: instagram || leagueToUpdate.instagram,
        facebook: facebook || leagueToUpdate.facebook,
        whatsapp: whatsapp || leagueToUpdate.whatsapp,
        website: website || leagueToUpdate.website,
        primary_color: primary_color || leagueToUpdate.primary_color,
        secondary_color: secondary_color || leagueToUpdate.secondary_color
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