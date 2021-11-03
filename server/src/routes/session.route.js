const router = require('express').Router()
const { addSession, getSessions, deleteSession } = require('../controllers/session.controller')

router.post('/addSession', addSession)
router.get('/getSessions/:dateFrom/:dateTill', getSessions)
router.delete('/deleteSession', deleteSession)
module.exports = router