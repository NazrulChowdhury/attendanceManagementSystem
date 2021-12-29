const router = require('express').Router()
const authenticate = require('../middleware/authenticate.middleware')
const errorHandler = require('../middleware/error.middleware')

router.use('/auth', require('./auth.route'))
router.use(authenticate)
router.use('/user', require('./user.route'))
router.use('/session', require('./session.route'))
router.use('/admin', require('./admin.route'))

router.use(errorHandler)

module.exports = router