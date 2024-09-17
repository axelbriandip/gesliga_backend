const { db, DataTypes } = require('../utils/db.util');

// create model
const Notification = db.define('notification', {
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
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user', // Nombre de la tabla relacionada
            key: 'id'
        }
    }
}, {
    timestamps: true //add createdAt and updatedAt
})

// export
module.exports = { Notification };