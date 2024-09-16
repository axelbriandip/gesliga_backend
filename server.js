// imports
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const dotenv = require('dotenv')

const app = express()

app.use(express.json())
app.use(helmet())
app.use(compression())

dotenv.config({ path: './config.env' })

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))
else if(process.env.NODE_ENV === 'production') app.use(morgan('combined'))

const startServer = async () => {
    try {
        console.log('Entró a startServer()!');
    } catch (err) {
        console.log(err);
    }
}

startServer()