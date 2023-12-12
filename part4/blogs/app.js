import config from './utils/config.js'
import express from 'express'
const app = express()
import cors from 'cors'
import logger from './utils/logger.js'
import mongoose from 'mongoose'
import blogsRouter from './controllers/blog.js'
import middleware from './utils/middleware.js'
import 'express-async-errors'

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app