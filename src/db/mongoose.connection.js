require('dotenv').config()
const mongoose = require('mongoose')

module.exports = ()=>{
    mongoose.connect(
        process.env.MONGO_URL,
        {useNewUrlParser:true, useUnifiedTopology:true}
    )
    mongoose.connection.on('connected',() => console.log('db is connected'))
    mongoose.connection.on('disconnected',() => console.log('mongoose is disconnected'))
    mongoose.connection.on('error',error => console.log(error))
    process.on('SIGINT',() => {
        mongoose.connection.close(() => {
          console.log('mongoose connection is closed due to forced app termination')
          process.exit(0)
        })
    })

}