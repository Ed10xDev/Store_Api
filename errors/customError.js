// custom error class

class CustomError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}

const createCustomError = (statusCode, message) => {
    return new CustomError(statusCode, message)
}

module.exports = { createCustomError, CustomError }
