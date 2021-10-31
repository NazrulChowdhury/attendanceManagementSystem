const router = require('express').Router()
const { addSession, getUserSessions, deleteSession } = require('../controllers/session.controller')

router.post('/addSession', addSession)
router.get('/getSessions/:dateFrom/:dateTill', getUserSessions)
router.delete('/deleteSession', deleteSession)
module.exports = router