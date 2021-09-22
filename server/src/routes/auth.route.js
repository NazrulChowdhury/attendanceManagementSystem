const router = require('express').Router()
const passport = require('passport')


//google auth routes
router.get(
    '/google', 
    passport.authenticate('google',{scope:['profile','email']})
)
router.get(
    '/google/redirect', 
    passport.authenticate('google'),
    (req,res) => res.send('you are now authenticated!')
)


module.exports = router