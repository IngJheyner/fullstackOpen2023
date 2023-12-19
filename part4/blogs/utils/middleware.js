import logger from "./logger.js"
import User from "../models/user.js"
import jwt from "jsonwebtoken"

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method)
    logger.info("Path:  ", request.path)
    logger.info("Body:  ", request.body)
    logger.info("---")
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
          error: 'token expired'
        })
    }

    next(error)
}

// Extraer el token del request y asignarlo a la propiedad token del request para que los demás middlewares puedan acceder a él
const tokenExtractor = (request, response, next) => {

    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    } else {
        request.token = null
    }

    next()
}

// Extraer el usuario del token
const userExtractor = async (req, res, next) => {

    //Unathorized
    if(req.token === null) {
        return res.status(401).json({ error: 'Unathorized' })
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    req.user = user
    next()
}

export default {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}