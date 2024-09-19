// import models
const { User } = require('./user.model')
const { Club } = require('./club.model')
const { Request } = require('./request.model')
const { Player } = require('./player.model')
const { Notification } = require('./notification_entry.model')
const { Pass } = require('./pass.model')
const { Sanction } = require('./sanction.model')
const { League } = require('./league.model')
const { Champion } = require('./champion.model')

// relations
const initModels = () => {    
    // Notification is associated with User
    User.hasMany(Notification, { foreignKey: 'user_id' });
    Notification.belongsTo(User, { foreignKey: 'user_id' });
        
    // League has many Clubs
    League.hasMany(Club, { foreignKey: 'league_id' });
    Club.belongsTo(League, { foreignKey: 'league_id' });
    
    // Club has many Passes (related to Players)
    Club.hasMany(Pass, { foreignKey: 'club_id' });
    Pass.belongsTo(Club, { foreignKey: 'club_id' });
    
    // Player has many Passes
    Player.hasMany(Pass, { foreignKey: 'player_id' });
    Pass.belongsTo(Player, { foreignKey: 'player_id' });

    
    // Club has many Sanctions
    Club.hasMany(Sanction, { foreignKey: 'club_id' });
    Sanction.belongsTo(Club, { foreignKey: 'club_id' });

    // Sanction can be associated with a Player or a Club
    Sanction.belongsTo(Player, { foreignKey: 'player_id', constraints: false });
    
    // Player and Club are related through Request
    Club.hasMany(Request, { foreignKey: 'club_id' });
    Request.belongsTo(Club, { foreignKey: 'club_id' });
    
    Player.hasMany(Request, { foreignKey: 'player_id' });
    Request.belongsTo(Player, { foreignKey: 'player_id' });
    
    // Champion has many-to-one relationships with Club for champion and runner-up
    Champion.belongsTo(Club, { foreignKey: 'champion_club_id', as: 'ChampionClub' });
    Champion.belongsTo(Club, { foreignKey: 'runner_up_club_id', as: 'RunnerUpClub' });
}

module.exports = { initModels }