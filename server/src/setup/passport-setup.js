const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const {getSocialUserById, createSocialUser} = require('../services/user.services')
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
    // check if the user already exist
    try{
      const existingUser = await getSocialUserById('google',profile.id)
      if(existingUser){ 
        done(null,existingUser)
        return
      } 
    // create new user if doesn't already exist
      const newUser = await createSocialUser(profile._json)
      done(null,newUser)
    } catch(err){
      console.log(err)
    }
  }
))