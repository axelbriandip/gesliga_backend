const { db, DataTypes } = require('../utils/db.util');

// create model
const Club = db.define('club', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    delegate_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'club',
    timestamps: true //add createdAt and updatedAt
})

// export
module.exports = { Club };