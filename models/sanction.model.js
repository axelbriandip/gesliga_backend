const { db, DataTypes } = require('../utils/db.util');

// create model
const Sanction = db.define('sanction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    target: {
        type: DataTypes.ENUM('club','player'),
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    issue_date: {
        type: DataTypes.DATEONLY,
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
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    severity: {
        type: DataTypes.ENUM('leve','medio', 'grave'),
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'player', // Nombre de la tabla relacionada
            key: 'id'
        }
    },
    club_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'club', // Nombre de la tabla relacionada
            key: 'id'
        }
    },
}, {
    timestamps: true //add createdAt and updatedAt
})

// export
module.exports = { Sanction };