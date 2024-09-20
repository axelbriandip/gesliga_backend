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
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.ENUM('Arquero', 'Defensor', 'Mediocampista', 'Delantero'),
        allowNull: false
    },
    preferred_foot: {
        type: DataTypes.ENUM('Zurdo', 'Derecho', 'Ambidiestro'),
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('Femenino', 'Masculino'),
        allowNull: false
    },
    birth_state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]+$/ // Solo números
        }
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    license_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'player',
    timestamps: true //add createdAt and updatedAt
})

// export
module.exports = { Player };