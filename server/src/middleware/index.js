const express = require('express')
const middleware = express.Router()
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const session = require('./redis.session')

middleware.use(cors())
middleware.use(express.json())
middleware.use(helmet())
middleware.use(morgan('common'))
middleware.use(express.urlencoded({extended:false}))
//session and cookie
middleware.use(session)

module.exports = middleware