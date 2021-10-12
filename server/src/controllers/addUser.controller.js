import ApiError from '../helper/error'
import {createInviteEmail, userEmailExist} from '../services/user.services'

const addUser = async(req, res, next) => {
    const email = req.body.email
    try{
        const emailExists = await userEmailExist(email)
        if(emailExists) {
           return Promise.reject(ApiError.badRequest(409,'user email already exists!'))
        }
        const email = await createInviteEmail(email)
        email ? res.send('done!') : Promise.reject()
        next()
    } catch(err){
        next(err)
    }

}
module.exports = addUser

// email already exists.
// wrong format email..
// blank email..
// new invite doesn't get created.
