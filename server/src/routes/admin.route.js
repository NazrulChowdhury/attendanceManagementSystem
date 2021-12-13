const router = require('express').Router()
const {addUser, getUsers, updateUser} =require('../controllers/admin.controller')


router.post('/addUser', addUser)
router.post('/updateUser',updateUser)
router.get('/getUsers', getUsers)

module.exports = router