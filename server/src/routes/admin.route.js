const router = require('express').Router()
const {
    addUser, 
    getUsers, 
    updateUser,
    getSelectedSessions,
    getUserFullName,
    removeUser
} =require('../controllers/admin.controller')


router.post('/addUser', addUser)
router.post('/updateUser',updateUser)
router.get('/getUsers', getUsers)
router.post('/getSelectedUserSessions',getSelectedSessions)
router.get('/getUserFullName/:id',getUserFullName) 
router.post('/removeUser',removeUser) 

module.exports = router