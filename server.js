// imports
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const dotenv = require('dotenv')
const { db } = require('./utils/db.util')
const { initModels } = require('./models/initModels')
const { globalErrorHandler } = require('./controllers/error.controller')

// routers
const { usersRouter } = require('./routes/users.routes')
const { playersRouter } = require('./routes/players.routes')
const { clubsRouter } = require('./routes/clubs.routes')
const { leaguesRouter } = require('./routes/leagues.routes')
const { notificationsRouter } = require('./routes/notifications.routes')
const { passesRouter } = require('./routes/passes.routes')
const { sanctionsRouter } = require('./routes/sanctions.routes')
const { finalsRouter } = require('./routes/finals.routes')
const { requestsRouter } = require('./routes/requests.routes')

const app = express()

app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(globalErrorHandler);

dotenv.config()

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))
else if(process.env.NODE_ENV === 'production') app.use(morgan('combined'))

const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Database authenticated successfully.');

        initModels();

        // await db.sync();
        await db.sync({ force:true });
        // { force: true } borra y recrea las tablas en cada inicio
        console.log('Database synced successfully.');
        
        // app.listen(process.env.DB_PORT || 3000, () => {
        app.listen(3000, () => {
            console.log('Express app running in port', 3000);
        })
    } catch (err) {
        console.log(err);
    }
}

// insert endpoints exists
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/players', playersRouter)
app.use('/api/v1/clubs', clubsRouter)
app.use('/api/v1/leagues', leaguesRouter)
app.use('/api/v1/notifications', notificationsRouter)
app.use('/api/v1/passes', passesRouter)
app.use('/api/v1/sanctions', sanctionsRouter)
app.use('/api/v1/finals', finalsRouter)
app.use('/api/v1/requests', requestsRouter)

// catch not-existings endpoints
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exists in our server`,
    });
});

startServer()