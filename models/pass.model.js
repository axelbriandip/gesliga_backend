// recover db
const { db, DataTypes } = require('../utils/db.util');

// create model
const Pass = db.define('pass', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    club_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'club', // Nombre de la tabla relacionada
            key: 'id'
        }
    },
    player_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
            model: 'player', // Nombre de la tabla relacionada
            key: 'id'
        }
    },
}, {
    tableName: 'pass',
    timestamps: true //add createdAt and updatedAt
})

// export
module.exports = { Pass };