
const session = require('express-session')
const redis = require('redis')
const connectRedis = require('connect-redis')
require('dotenv').config()

const RedisStore = connectRedis(session)
//Configure redis client
const redisClient = redis.createClient({url: process.env.REDIS_URL})

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err)
})
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully')
})
module.exports = session({
    store: new RedisStore({ client: redisClient }),
    secret : process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized : false,
    cookie :{
        httpOnly: true, // prevents client side js from reading the cookie
        secure: true, // need to be true in production to accept req from https only
        maxAge: 480*1000*60
    }
})