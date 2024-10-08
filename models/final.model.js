// recover db
const { db, DataTypes } = require('../utils/db.util');

// create model
const Final = db.define('champion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    season: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    award_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    goals_champion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    goals_runner_up: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    penalties_champion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    penalties_runner_up: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    champion_club_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'club', // Nombre de la tabla relacionada
            key: 'id'
        }
    },
    runner_up_club_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'club', // Nombre de la tabla relacionada
            key: 'id'
        }
    },
}, {
    tableName: 'final',
    timestamps: true //add createdAt and updatedAt
})

// export
module.exports = { Final };