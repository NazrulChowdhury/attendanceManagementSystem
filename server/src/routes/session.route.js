const router = require('express').Router()
const { addSession, getSessions, deleteSession, startSession, getActiveSession, stopSession, todaysSessions } 
= require('../controllers/session.controller')

router.post('/addSession', addSession)
router.post('/startSession',startSession)
router.get('/getActiveSession', getActiveSession )
router.post('/stopSession', stopSession)
router.get('/getSessions/:dateFrom/:dateTill', getSessions)
router.delete('/deleteSession', deleteSession)
router.get('/todaysSessions/:date', todaysSessions)
module.exports = router