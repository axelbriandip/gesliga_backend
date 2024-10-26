const { db, DataTypes } = require('../utils/db.util');

// create model
const Player = db.define('player', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    club_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'player',
    timestamps: true //add createdAt and updatedAt
})

// export
module.exports = { Player };