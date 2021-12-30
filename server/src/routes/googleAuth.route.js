const router = require('express').Router()
const passport = require('passport')

//google auth routes
router.get(
    '/google', 
    passport.authenticate('google',{scope:['profile','email']}) 
)
router.get(
    '/google/redirect',
    passport.authenticate('google',{ 
        successRedirect: process.env.CLIENT_BASE_URL,
        failureRedirect: `${process.env.CLIENT_BASE_URL}?invited=notFound`
    })
)

// router.get('/google/redirect',
//     passport.authenticate('google', {
//         failureRedirect: `${process.env.CLIENT_BASE_URL}?invited=notFound`,
//     }),
//     function (req, res) {
//         res.redirect(process.env.CLIENT_BASE_URL)

//     }
// )
module.exports = router