const passport = require('passport')
const router = require('express').Router()
require('../setup/passport-setup')


router.use(passport.initialize())
router.use(passport.session())

module.exports = router
