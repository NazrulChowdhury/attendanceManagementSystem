const router = require('express').Router()
const passport = require('passport')
const authenticate = require('../middleware/authenticate.middleware')

//google auth routes
router.get(
    '/google', 
    passport.authenticate('google',{scope:['profile','email']})
)
router.get(
    '/google/redirect', 
    passport.authenticate('google',{
        successRedirect: "http://localhost:3000"
       })
)
router.get('/getUser',authenticate, (req, res)=> res.send(req.user))
// router.get(
//     '/google/redirect', 
//     passport.authenticate('google'),
//     (req,res) => res.send(req.user)
// )


module.exports = router