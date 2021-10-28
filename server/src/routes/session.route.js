const router = require('express').Router()

router.post('/addSession', require('../controllers/test.controller'))
router.get('/test/:dateFrom/:dateTill', require('../controllers/test.controller'))
module.exports = router