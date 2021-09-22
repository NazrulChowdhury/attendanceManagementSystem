const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
require('dotenv').config()

passport.serializeUser((profile, done)=> done(null, profile.id))

passport.deserializeUser((id, done)=> done(null, id))

passport.use(new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  }, 
  async(request, accessToken, refreshToken, profile, done)=>{
    // check if the user already exist
   return done(null,profile)
  }
))