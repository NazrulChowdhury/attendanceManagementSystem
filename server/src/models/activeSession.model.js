const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const activeSession = mongoose.Schema({
    user : String,
    startTime : Number,
    deleteHobayKobay: {
        type: Date,
        default: Date.now,
        index: { expires: 3600 } 
     }
    
})

module.exports = mongoose.model('ActiveSession', activeSession)