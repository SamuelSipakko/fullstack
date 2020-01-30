const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

app.use(express.static('build'))

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
        .then(() => logger.info('connected to MongoDB'))
        .catch(error => logger.error('error connection to MongoDB:', error.message))


app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

if (process.env.NODE_ENV === 'test') {
        const testingRouter = require('./controllers/testing')
        app.use('/api/testing', testingRouter)
}

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

module.exports = app