const mongoose = require('mongoose')

const activeSession = mongoose.Schema({
    id : String,
    startTime : Number
    
})
module.exports = mongoose.model('ActiveSession', activeSession)