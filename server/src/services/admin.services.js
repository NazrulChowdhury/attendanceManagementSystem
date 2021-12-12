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

module.exports = {createInviteEmail, inviteEmailExist}