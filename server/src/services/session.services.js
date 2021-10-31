const UserSession = require("../models/session.model")

const createSession = async(sessionObj) => {
    return await new UserSession(sessionObj).save()
}
const getSessions = async(dateFrom, dateTill) => {
    return await UserSession.find({date : { $gte : dateFrom, $lt : dateTill} }).sort({date : 'asc'})
}
const deleteSessionById = async(sessionId) => {
    return await UserSession.deleteOne({ _id : sessionId})
}
module.exports = { createSession, getSessions, deleteSessionById}