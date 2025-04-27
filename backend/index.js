const express = require('express')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const logger = require('./middlewares/logger')

require('dotenv').config()

const apiRoute = require('./routes/api')

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET'],
  optionsSuccessStatus: 200
}

// Middleware
app.use(cors(corsOptions)) // Cors
app.use(express.json()) // Used to parse JSON bodies
app.use(express.urlencoded()) // Parse URL-encoded bodies

if (process.env.USE_LOGGER === 'true') {
  app.use(logger) // Logging middleware
}

// Routes
app.get('/', (_req, res) => {
  res.json({ msg: 'Server is running' })
})

app.use('/api', apiRoute)

// Error handling middleware
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = {
  app
}
