const router = require('express').Router()
 const authenticate = require('../middleware/authenticate.middleware')
const errorHandler = require('../middleware/error.middleware')


router.get('/', (req, res) => res.send('wellcome'))
router.post('/addUser')
router.use('/auth', require('./auth.route'))
router.use(errorHandler)

module.exports = router