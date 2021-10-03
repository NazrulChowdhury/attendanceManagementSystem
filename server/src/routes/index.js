const router = require('express').Router()
 const authenticate = require('../middleware/authenticate.middleware')


router.get('/', require('../controllers/auth.Controller'))
router.use('/auth', require('./auth.route'))

module.exports = router