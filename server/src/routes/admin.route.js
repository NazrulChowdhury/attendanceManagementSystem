const router = require('express').Router()
const {addUser, getUsers} =require('../controllers/admin.controller')


router.post('/addUser', addUser)
router.get('/getUsers', getUsers)

module.exports = router