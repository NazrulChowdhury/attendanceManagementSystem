const router = require('express').Router()
const passport = require('passport')
const authController = require('../controllers/auth.Controller')

//google auth routes

router.get('/logout', authController.logout)
router.get('/getUserStatus', authController.getUserStatus) 

module.exports = router