// import models
const { User } = require('./user.model')
const { Club } = require('./club.model')
const { Request } = require('./request.model')
const { Player } = require('./player.model')
const { Notification } = require('./notification_entry.model')
const { Pass } = require('./pass.model')
const { Sanction } = require('./sanction.model')
const { League } = require('./league.model')

// relations
const initModels = () => {
    console.log('Entró init models');
}

module.exports = {
    initModels
}