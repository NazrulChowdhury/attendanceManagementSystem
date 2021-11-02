const router = require('express').Router()
const authenticate = require('../middleware/authenticate.middleware')
const errorHandler = require('../middleware/error.middleware')



router.get('/', (req, res, next) => { res.send(req.user)})
router.use('/auth', require('./auth.route'))
router.use('/session', require('./session.route'))
router.post('/addUser', require('../controllers/addUser.controller'))

router.use(errorHandler)

module.exports = router