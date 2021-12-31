const ApiError = require("../helper/error")

const authenticate = (req,res,next)=>{
    (!req.user) ? next(ApiError.badRequest(401, 'you are not logged in!')) : next()
}
module.exports = authenticate