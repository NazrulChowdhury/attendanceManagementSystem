const User = require('../models/user.model')
const inviteEmail = require('../models/invite.model')

const getSocialUserById = async(platformName,id)=>{
    const query = {}
    query[`social.${platformName}ID`] = id
    return await User.findOne(query)
}

const createSocialUser = async(user)=>{
    const { sub, given_name, family_name, email, locale, picture, userType} = user
    return await new User({
        firstName:given_name,     
        lastName: family_name,
        email:email,
        social:{
          googleID:sub
        },
        locale,
        picture,
        userType       
    })
    .save()

}

const createInviteEmail = async(InviteEmail) => {
    return await new inviteEmail({
        email : InviteEmail 
    }).save()
}
const inviteEmailExist = async(email)=>{
 return await inviteEmail.findOne({'email': email})

}
const clearInvite = async(email) =>{
    return await inviteEmail.deleteOne({'email':email})
}
const updateUserPicture = async(id, picture) => {
    return await User.updateOne({_id : id}, {picture})
}
module.exports = {
    getSocialUserById,createSocialUser,createInviteEmail,
    inviteEmailExist, clearInvite, updateUserPicture
}


