const express = require('express')
const app = express()
const middleware = require('./src/middleware')
const router = require('./src/routes')
require('dotenv').config()
const port = process.env.SERVER_PORT
const db = require('./src/db/mongoose.connection')


//middleware 
app.use(middleware)
//routes
app.use(router)
//connect db
db()


app.listen(port, error => error? console.log('server failed to start'): 
    console.log(`server is listening on port: ${port}`)
)
