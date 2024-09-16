const { DataTypes, Sequelize } = require('sequelize')

const dotenv = require('dotenv')

dotenv.config()

// establish connection db
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false
    }
)

module.exports = {
    db,
    DataTypes
}