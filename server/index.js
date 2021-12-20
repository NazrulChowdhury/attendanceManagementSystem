const express = require('express')
const app = express()
const middleware = require('./src/middleware')
const router = require('./src/routes')
require('dotenv').config()
const port = process.env.PORT || 8080
const db = require('./src/db/mongoose.connection')
const googleAuth = require('./src/routes/googleAuth.route')


//middleware 
app.use(middleware)

//routes
app.use('/auth',googleAuth)
app.use('/api',router)

//connect db
db()

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./client/build'))
}

app.listen(port, error => error? console.log('server failed to start'): 
    console.log(`server is listening on port: ${port}`)
)
