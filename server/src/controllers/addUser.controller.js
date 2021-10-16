const ApiError = require( '../helper/error')
const {createInviteEmail, inviteEmailExist} = require('../services/user.services')

const addUser = async(req, res, next) => { 
    const email = req.body.email
    try{
        const emailExists = await inviteEmailExist(email)
        if(emailExists) {
           next(ApiError.badRequest(409,'user email already exists!'))
           return
        }
        const inviteEmail = await createInviteEmail(email)
        inviteEmail ? res.send('done!') : next(ApiError.internal())
        next()
    } catch(err){
        next(err)
    }

}
module.exports = addUser


