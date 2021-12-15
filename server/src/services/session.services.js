const UserSession = require("../models/session.model")
const ActiveSession = require('../models/activeSession.model')
const { getDateString } = require("../helper/date")

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
    return await new ActiveSession(sessionObj).save()
}
const getActiveSession = async(userId) =>{
    return await ActiveSession.findOne({user : userId})
}
const deleteActiveSession = async(userId) =>{
    return await ActiveSession.deleteOne({user : userId})
}
const getTodaysSessions = async(date, userId) =>{
    return await UserSession.find({date : date, user : userId})
}
const getSessionTotal = async(sessions)=>{
    const dateReducedSessions = sessions.reduce((acc, val) => {
        const found = acc.find((findVal) => val.date === findVal.date)
        if (!found) acc.push(val)
        else found.sessionLength += val.sessionLength
        return acc
      }, [])
    const combinedSessionsArray = dateReducedSessions.map((session) => {       
        return {
            value: session.sessionLength,
            day: getDateString(session.date) 
        }
    })
    return combinedSessionsArray
}
module.exports = { 
    createSession, 
    getUserSessions, 
    deleteSessionById, 
    createActiveSession,
    getActiveSession,
    deleteActiveSession,
    getTodaysSessions,
    getSessionTotal
}