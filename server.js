// imports
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const dotenv = require('dotenv')
const { db } = require('./utils/db.util')
const { initModels } = require('./models/initModels')

const app = express()

app.use(express.json())
app.use(helmet())
app.use(compression())

dotenv.config()

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))
else if(process.env.NODE_ENV === 'production') app.use(morgan('combined'))

const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Database authenticated successfully.');

        initModels();

        await db.sync({ force:true });
        // { force: true } borra y recrea las tablas en cada inicio
        console.log('Database synced successfully.');
        
        app.listen(process.env.DB_PORT, () => {
            console.log('Express app running in port ', process.env.DB_PORT);
        })
    } catch (err) {
        console.log(err);
    }
}

startServer()