const User = require('../models/user.model')
const inviteEmail = require('../models/invite.model')

const getSocialUserById = async(platformName,id)=>{
    const query = {}
    query[`social.${platformName}ID`] = id
    return await User.findOne(query)
}

const createSocialUser = async(user)=>{
    const { sub, given_name, family_name, email, locale} = user
        return await new User({
        firstName:given_name,     
        lastName: family_name,
        email:email,
        social:{
          googleID:sub
        },
        locale :locale
    })
    .save()

}

const createInviteEmail = async(InviteEmail) => {
    await new inviteEmail({
        email : InviteEmail
    }).save()
}
const userEmailExist = async(userEmail)=>{
 return await inviteEmail.findOne({'email':userEmail})

}

module.exports = {getSocialUserById,createSocialUser,createInviteEmail,userEmailExist}


