const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const AuthError = require('../helper/auth.error')
const {getSocialUserById, createSocialUser, inviteEmailExist, clearInvite} = require('../services/user.services')
require('dotenv').config()

passport.serializeUser((user, done)=> done(null, user.id))

passport.deserializeUser((id, done)=> done(null, id))

passport.use(new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  }, 
  async(request, accessToken, refreshToken, profile, done)=>{
    const email = profile._json.email
    try{
      const existingUser = await getSocialUserById('google',profile.id)
      if(existingUser){
        done(null,existingUser)
        return
      }

     const isInvited = await inviteEmailExist(email)
     if(!isInvited){
      done(AuthError.badRequest(409,'user need to be added first!'))
      return
     }
      const newUser = await createSocialUser(profile._json)
      await clearInvite(email)
      done(null,newUser)

    } catch(err){
      console.log(err)
    }
  }
))