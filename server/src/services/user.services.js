const User = require('../models/user.model')
const inviteEmail = require('../models/invite.model')

const getSocialUserById = async(platformName,id)=>{
    const query = {}
    query[`social.${platformName}ID`] = id
    return await User.findOne(query)
}

const createSocialUser = async(profile, role)=>{ 
    const { sub, given_name, family_name, email, locale, picture} = profile
    return await new User({
        firstName:given_name,     
        lastName: family_name,
        email:email,
        social:{
          googleID:sub
        },
        locale,
        picture,
        role      
    })
    .save()

}
const clearInvite = async(email) =>{
    return await inviteEmail.deleteOne({'email':email})
}
const updateUserPicture = async(id, picture) => {
    return await User.updateOne({_id : id}, {picture})
}


module.exports = {
    getSocialUserById,createSocialUser, clearInvite, updateUserPicture
}


