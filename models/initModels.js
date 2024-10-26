const { Club } = require('./club.model');
const { Player } = require('./player.model');
const { User } = require('./user.model');

function initModels() {
    // Relación entre Club y User (uno a uno para todos los roles: delegado, admin, invitado)
    Club.hasOne(User, { foreignKey: 'club_id', constraints: true });
    User.belongsTo(Club, { foreignKey: 'club_id', constraints: true });

    // Relación entre Club y Player (uno a muchos)
    Club.hasMany(Player, { foreignKey: 'club_id', constraints: true });
    Player.belongsTo(Club, { foreignKey: 'club_id', constraints: true });
}

module.exports = initModels;