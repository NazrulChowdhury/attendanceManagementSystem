const router = require('express').Router()
const errorHandler = require('../middleware/error.middleware')

router.use('/auth', require('./auth.route'))
router.use('/session', require('./session.route'))
// router.post('/addUser', require('../controllers/addUser.controller'))
router.use('/admin', require('./admin.route'))

router.use(errorHandler)

module.exports = router