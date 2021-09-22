const router = require('express').Router()

router.get('/', require('../controllers/auth.Controller'))
router.get('/mypage',(req,res) => { res.send('you are now logged in')})

module.exports = router