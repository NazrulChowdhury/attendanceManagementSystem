const { Mongoose } = require("mongoose")
const UserSession = require("../models/session.model")

const createSession = async(sessionObj) => {
    return await new UserSession(sessionObj).save()
}
const getSessions = async(dateFrom, dateTill, id) => {
    return await UserSession.find({date : { $gte : dateFrom, $lt : dateTill} }).sort({date : 'asc'})
}
module.exports = { createSession, getSessions}