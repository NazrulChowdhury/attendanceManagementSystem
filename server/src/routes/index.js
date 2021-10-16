const router = require('express').Router()
const authenticate = require('../middleware/authenticate.middleware')
const errorHandler = require('../middleware/error.middleware')



router.get('/', (req, res, next) => { res.send('welcome!')})
router.post('/test', require('../controllers/test.controller'))
router.use('/auth', require('./auth.route'))
router.post('/addUser', require('../controllers/addUser.controller'))
router.use(errorHandler)

module.exports = router