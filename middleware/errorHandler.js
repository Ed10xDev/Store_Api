const { CustomError } = require('../errors/customError')

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({ msg: err.message })
    }
    res.status(500).json({ msg: 'Something went wrong please try again later' })
}

module.exports = errorHandler
