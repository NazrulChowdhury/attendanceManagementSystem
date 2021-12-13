const User = require('../models/user.model')
const inviteEmail = require('../models/invite.model')

const createInviteEmail = async(email, role) => {
    return await new inviteEmail({
        email,
        role
    }).save()
}
const inviteEmailExist = async(email)=>{
 return await inviteEmail.findOne({'email': email})

}
const getAllUsers = async() => {
    return await User.find()
}
const updateUserRole = async(id, role)=>{
    return await User.updateOne({_id : id}, {role})
}

module.exports = {
    createInviteEmail, 
    inviteEmailExist,
    getAllUsers,
    updateUserRole
}