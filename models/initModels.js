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

    // Un Club tiene un Delegado (User)
    Club.belongsTo(User, {
        foreignKey: 'delegate_id',  // Clave foránea en Club que apunta a User
        as: 'delegate' // Alias para acceder al delegado desde Club
    });

    // Un Club tiene una sola Liga (League)
    Club.belongsTo(League, {
        foreignKey: 'league_id',  // Clave foránea en Club que apunta a League
        as: 'league' // Alias para acceder a la Liga desde Club
    });

    // Un Pass tiene un solo Player
    Pass.belongsTo(Player, {
        foreignKey: 'player_id',  // Clave foránea en Pass que apunta a Player
        as: 'player' // Alias para acceder a la Player desde Pass
    });

    // Un Pass tiene un solo Club
    Pass.belongsTo(Club, {
        foreignKey: 'club_id',  // Clave foránea en Pass que apunta a Club
        as: 'club' // Alias para acceder a la Club desde Pass
    });
}

module.exports = { initModels }