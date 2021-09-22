const router = require('express').Router()


router.get('/', require('../controllers/auth.Controller'))
router.use('/auth', require('./auth.route'))

module.exports = router