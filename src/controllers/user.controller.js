const ApiError = require('../helper/error')
const {getUser} = require('../services/user.services')

const getProfile = async(req, res, next) => {
    try{
        const user = await getUser(req.user)
        !user ? next(ApiError.badRequest(404, 'No user profile found!')) : 
        res.send({
            name : user.firstName,
            image : user.picture
        })
    } catch (error){
        next('error')
    }
}
module.exports = {
    getProfile
}
