const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('----')
    next()
}

const unkownAddress = (request, response) => {
    response.status(404).json({ error : 'unkown address' })
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
       request.token = authorization.substring(7)
    }
    else request.token = null
    next()
  }

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    const errWithMsg = (code, msg) => response.status(code).json({ error: msg })

    if (error.name === 'CastError' && error.kind === 'ObjectId')
        return errWithMsg(400, 'malformatted id')
    if (error.name === 'ValidationError') {
        let msg = ''
        if (error.errors.title) {
            msg = error.errors.title.message
            if (error.errors.url)
            msg = `${msg} and ` 
        }
        if (error.errors.url)
            msg = msg + error.errors.url.message
        return errWithMsg(400, msg)
    }
    if (error.name === 'JsonWebTokenError')
        return errWithMsg(401, error.message)
    next(error)
}

module.exports = { 
    requestLogger,
    unkownAddress,
    tokenExtractor,
    errorHandler
}