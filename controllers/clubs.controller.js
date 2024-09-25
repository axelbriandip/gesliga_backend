const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { Club } = require('../models/club.model')
const { User } = require('../models/user.model')
const { League } = require('../models/league.model')

const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const getAllClubs = catchAsync(async(req, res, next) => {
    const clubs = await Club.findAll({
        where: { is_active: true },
        include: [
            {
                model: User,
                as: 'delegate',  // Utiliza el alias 'delegate'
                attributes: ['id', 'username', 'email', 'first_name', 'last_name', 'phone_number'] // Los datos que deseas incluir del delegado
            },
            {
                model: League,
                as: 'league',  // Utiliza el alias 'delegate'
                attributes: ['id', 'full_name', "short_name"] // Los datos que deseas incluir del delegado
            }
        ]
    })

    res.status(200).json({
        status: 'success',
        data: { clubs }
    })
})

const getClub = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    // const club = await Club.findOne({ where: { id, is_active: true } });
    const club = await Club.findOne({
        where: { id, is_active: true },
        include: [
            {
                model: User,
                as: 'delegate',  // Utiliza el alias 'delegate'
                attributes: ['id', 'username', 'email', 'first_name', 'last_name', 'phone_number'] // Los datos que deseas incluir del delegado
            },
            {
                model: League,
                as: 'league',  // Utiliza el alias 'delegate'
                attributes: ['id', 'full_name', "short_name"] // Los datos que deseas incluir del delegado
            }
        ]
    });

    // if not exists
    if (!club) {
        return res.status(404).json({
            status: 'error',
            message: 'Club not found'
        });
    }

    // response
    res.status(200).json({
        status: 'success',
        data: { club }
    });
})

const createClub = catchAsync(async(req, res,next) => {
    // receive data
    const {
        full_name,
        short_name,
        abb_name,
        primary_color,
        secondary_color,
        president_first_name,
        president_last_name,
        president_contact,
        history,
        instagram,
        facebook,
        whatsapp,
        website,
        league_id,
        delegate_id
    } = req.body
        
    // create resource
    const newClub = await Club.create({
        full_name,
        short_name,
        abb_name,
        primary_color,
        secondary_color,
        president_first_name,
        president_last_name,
        president_contact,
        history,
        instagram,
        facebook,
        whatsapp,
        website,
        league_id,
        delegate_id
    })

    res.status(201).json({
        status: 'success',
        data: { newClub }
    })
})

const updateClub = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const clubToUpdate = await Club.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!clubToUpdate) {
        return res.status(404).json({
            status: 'error',
            message: 'Club not found'
        });
    }

    // receive data
    const {
        full_name,
        short_name,
        abb_name,
        primary_color,
        secondary_color,
        president_first_name,
        president_last_name,
        president_contact,
        history,
        instagram,
        facebook,
        whatsapp,
        website,
        league_id,
        delegate_id
    } = req.body
    
    // update
    const clubUpdated = await clubToUpdate.update({
        full_name: full_name || clubToUpdate.full_name,
        short_name: short_name || clubToUpdate.short_name,
        abb_name: abb_name || clubToUpdate.abb_name,
        primary_color: primary_color || clubToUpdate.primary_color,
        secondary_color: secondary_color || clubToUpdate.secondary_color,
        president_first_name: president_first_name || clubToUpdate.president_first_name,
        president_last_name: president_last_name || clubToUpdate.president_last_name,
        president_contact: president_contact || clubToUpdate.president_contact,
        history: history || clubToUpdate.history,
        instagram: instagram || clubToUpdate.instagram,
        facebook: facebook || clubToUpdate.facebook,
        whatsapp: whatsapp || clubToUpdate.whatsapp,
        website: website || clubToUpdate.website,
        league_id: league_id || clubToUpdate.league_id,
        delegate_id: delegate_id || clubToUpdate.delegate_id,
    })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { clubUpdated }
    });
})

const deleteClub = catchAsync(async(req, res,next) => {
    const { id } = req.params;

    // search for id
    const clubToDelete = await Club.findOne({ where: { id, is_active: true } });

    // if not exists
    if (!clubToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'Club not found'
        });
    }

    // soft delete
    const clubDeleted = await clubToDelete.update({ is_active: false })

    // user updated
    res.status(200).json({
        status: 'success',
        data: { clubDeleted }
    });
})

module.exports = {
    getAllClubs,
    createClub,
    updateClub,
    deleteClub,
    getClub
}