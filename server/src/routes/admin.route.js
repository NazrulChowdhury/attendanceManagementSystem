const {addUser} =require('../controllers/admin.controller')
const router = require('express').Router()


router.post('/addUser', addUser)

module.exports = router