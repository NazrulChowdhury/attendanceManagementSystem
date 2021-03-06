const User = require('../models/user.model')
const inviteEmail = require('../models/invite.model')
const Session = require('../models/session.model')

const createInviteEmail = async(email, role) => {
    return await new inviteEmail({
        email,
        role
    }).save()
}
const inviteEmailExist = async(email) => {
 return await inviteEmail.findOne({'email': email})

}
const getAllUsers = async() => {
    return await User.find()
}
const updateUserRole = async(id, role) => {
    return await User.updateOne({_id : id}, {role})
}
const getUserFullName = async(id) => {
    const user = await User.findById(id)
    return `${user.firstName}-${user.lastName}`
}
const removeUser = async(id) => {
    return await User.deleteOne({_id : id})
}
const removeAllSessions = async(id) => {
    return await Session.deleteMany({user : id})
}
module.exports = {
    createInviteEmail, 
    inviteEmailExist,
    getAllUsers,
    updateUserRole,
    getUserFullName,
    removeUser,
    removeAllSessions
}