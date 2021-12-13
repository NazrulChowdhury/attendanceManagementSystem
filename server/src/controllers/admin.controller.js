const ApiError = require( '../helper/error')
const {createInviteEmail, inviteEmailExist, getAllUsers, updateUserRole} = require('../services/admin.services')

const addUser = async(req, res, next) => { 
    const {email, role} = req.body
    try{
        const emailExists = await inviteEmailExist(email)
        if(emailExists) {
           next(ApiError.badRequest(409,'user email already exists!'))
           return
        }
        const inviteEmail = await createInviteEmail(email, role)
        inviteEmail ? res.send('done!') : next(ApiError.internal())
        next()
    } catch(err){
        next(err)
    }

}
const getUsers = async(req, res, next) => {
    try{
        const users = await getAllUsers()
        !users ? next('error') : res.send(users)
    } catch(error){
        next (error)
    }
}
const updateUser = async(req, res, next)=>{
    const {id, role} = req.body
    try{
        const status = await updateUserRole(id, role)
        status ? res.send('Success!') : next('error')
    }catch(error){
        next(error)
    }
}
module.exports = {addUser, getUsers, getUsers, updateUser}


