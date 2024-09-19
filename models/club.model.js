const { db, DataTypes } = require('../utils/db.util');

// create model
const Club = db.define('club', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    short_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    abb_name: {
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: true
    },
    primary_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^#[0-9A-F]{6}$/i // Validación para hexadecimal
        }
    },
    secondary_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^#[0-9A-F]{6}$/i
        }
    },    
    president_first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    president_last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    president_contact: {
        type: DataTypes.STRING(20), // Limitar la longitud
        allowNull: false
    },
    history: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    whatsapp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]+$/  // Valida que contenga solo números
        }
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    league_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    delegate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'club',
    timestamps: true //add createdAt and updatedAt
})

// export
module.exports = { Club };