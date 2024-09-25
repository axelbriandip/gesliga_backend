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
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    short_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    abb_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    primary_color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secondary_color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    president_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    president_last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    president_contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    history: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    whatsapp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: true,
    },
}, {
    tableName: 'club',
    timestamps: true //add createdAt and updatedAt
})

// export
module.exports = { Club };