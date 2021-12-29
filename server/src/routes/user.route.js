const router = require('express').Router()
const { getProfile } = require('../controllers/user.controller')

router.get('/profile', getProfile) 

module.exports = router