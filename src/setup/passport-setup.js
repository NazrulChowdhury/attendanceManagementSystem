const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const {
  getSocialUserById, 
  createSocialUser, 
  clearInvite, 
  updateUserPicture
} = require('../services/user.services')
const {inviteEmailExist} = require('../services/admin.services')
require('dotenv').config()

passport.serializeUser((user, done)=> done(null, user.id))

passport.deserializeUser((id, done)=> done(null, id))

passport.use(new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect',
    proxy: true
  }, 
  async(request, accessToken, refreshToken, profile, done)=>{
    try{
      const existingUser = await getSocialUserById('google',profile.id)
      console.log('existing user ---', existingUser)
      if(existingUser){
        const {id, picture} = existingUser
        if(picture !== profile._json.picture)  {
          await updateUserPicture(id, profile._json.picture) 
        } 
        done(null,existingUser)
        return
      }
      const isInvited = await inviteEmailExist(profile._json.email)
      if(!isInvited){
       done(null, null)
        return
      }
      const {role} = isInvited
      const newUser = await createSocialUser(profile._json, role)
      await clearInvite(profile._json.email)
      done(null,newUser)

    } catch(err){
      done(err, null)
    }
  }
))