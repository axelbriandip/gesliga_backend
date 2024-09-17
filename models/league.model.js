const { db, DataTypes } = require('../utils/db.util');

// create model
const League = db.define('league', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    short_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foundation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: false
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: false
    },
    whatsapp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false
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
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'league',
    timestamps: true //add createdAt and updatedAt
})

// export
module.exports = { League };