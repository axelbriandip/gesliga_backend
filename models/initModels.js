// import models
const { User } = require('./user.model')
const { Club } = require('./club.model')
const { Request } = require('./request.model')
const { Player } = require('./player.model')

// relations
const initModels = () => {
    console.log('Entró init models');
}

module.exports = {
    initModels
}