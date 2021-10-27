const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema({
    date : Number,
    startTime: String,
    endTime: String,
    sessionTotalTime: Number
})
module.exports = mongoose.model('UserSession', sessionSchema)