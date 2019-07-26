const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')

// const siteRouter = require('')
const fleetRouter = require('./routers/fleet')
const maintenanceRouter = require('./routers/maintenance')
const docsRouter = require('./routers/docs')
const zipRouter = require('./routers/api/zips')
const taskRouter = require('./routers/api/tasks')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context)
})

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// For API calls to zips and tasks
app.use('/api', express.json())

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Zip Status Board'
    })
})

app.use('/fleet', fleetRouter)
app.use('/maintenance', maintenanceRouter)
app.use('/docs', docsRouter)
app.use('/api/zips', zipRouter)
app.use('/api/tasks', taskRouter)

module.exports = app