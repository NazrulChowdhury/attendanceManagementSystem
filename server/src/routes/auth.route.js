const router = require('express').Router()
const passport = require('passport')
const authController = require('../controllers/auth.Controller')

//google auth routes

router.get('/logout', authController.logout)
router.get('/getUserStatus', (req, res)=> req.user ? res.send(true) : res.send(false) )

module.exports = router