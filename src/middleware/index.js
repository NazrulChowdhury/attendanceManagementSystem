const express = require('express')
const middleware = express.Router()
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const session = require('./redis.session')
const passport = require('./passport.middleware')

middleware.use(cors({
    credentials: true // allow session cookie from browser to pass through
  }))
middleware.use(express.json())
middleware.use(helmet())
middleware.use(morgan('common'))
middleware.use(express.urlencoded({extended:false}))
//session and cookie
middleware.use(session)
middleware.use(passport)

module.exports = middleware