const router = require('express').Router()
 const authenticate = require('../middleware/authenticate.middleware')
const errorHandler = require('../middleware/error.middleware')


router.get('/', require('../controllers/auth.Controller'))
router.post('/addUser')
router.use('/auth', require('./auth.route'))
router.use(errorHandler)

module.exports = router