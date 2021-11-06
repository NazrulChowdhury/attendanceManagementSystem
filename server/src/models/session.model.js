const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema({
    user : String,
    date : Number,
    startTime: Number,
    endTime: Number,
    sessionLength: Number 
})
module.exports = mongoose.model('UserSession', sessionSchema)