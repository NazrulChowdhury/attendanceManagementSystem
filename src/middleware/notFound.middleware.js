const ApiError = require("../helper/error")

const notFound = (req, res, next) => {
    next(ApiError.badRequest(404, 'Resource not found!')) 
}
module.exports = {notFound}