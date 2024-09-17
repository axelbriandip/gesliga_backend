const { db, DataTypes } = require('../utils/db.util');

// create model
const Request = db.define('request', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Transfer', 'Release', 'Loan'), // Ajusta según los tipos válidos
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), // Ajusta según los estados válidos
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true, // Puedes hacerlo opcional si es que no siempre se requiere
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user', // Nombre de la tabla relacionada
            key: 'id'
        }
    },
    player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'player',
            key: 'id'
        }
    },
    origin_club_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'club',
            key: 'id'
        }
    },
    destination_club_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // En caso de que no haya club destino en solicitudes de liberación
        references: {
            model: 'club',
            key: 'id'
        }
    },
}, {
    timestamps: true //add createdAt and updatedAt
})

// export
module.exports = { Request };