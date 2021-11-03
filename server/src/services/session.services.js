const UserSession = require("../models/session.model")
const ActiveSession = require('../models/activeSession.model')

const createSession = async(sessionObj) => {
    return await new UserSession(sessionObj).save()
}
const getUserSessions = async(dateFrom, dateTill, userId) => {
    return await UserSession.find({date : 
        { $gte : dateFrom, $lt : dateTill},
        user : userId
     })
    .sort({date : 'asc'})
}
const deleteSessionById = async(sessionId) => {
    return await UserSession.deleteOne({ _id : sessionId})
}
const createActiveSession = async(sessionObj) => {
    ActiveSession.index( { "expireAt": 1 }, { expireAfterSeconds: 30 } )
    return await new ActiveSession(sessionObj).save()
}
module.exports = { createSession, getUserSessions, deleteSessionById, createActiveSession}