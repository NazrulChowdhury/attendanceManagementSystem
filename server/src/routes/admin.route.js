const router = require('express').Router()
const {
    addUser, 
    getUsers, 
    updateUser,
    getSelectedSessions
} =require('../controllers/admin.controller')


router.post('/addUser', addUser)
router.post('/updateUser',updateUser)
router.get('/getUsers', getUsers)
router.post('/getSelectedUserSessions',getSelectedSessions)

module.exports = router