const ApiError = require("../helper/error")
const { getUser } = require("../services/user.services")

const isAdmin = async(req, res, next) => {
    try{
        const user = await getUser(req.user)
        if(!user){
            next(ApiError(404, 'user Not found!'))
            return
        }
        user.role === 'admin' ? next() : next(ApiError.badRequest(401, 'Unauthorized'))
    } catch(error){
        next(error)
    }
}
module.exports = isAdmin