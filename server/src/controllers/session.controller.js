const { getTomorrow } = require("../helper/date")
const { createSession ,getSessions, deleteSessionById } = require("../services/session.services")

const addSession = async(req, res, next) => {
    try{
        const newSession = req.body
        const sessionCreated = await createSession(newSession)
        sessionCreated ? res.send('success!') : next('error')
    } catch(err){
        console.log(err)
        next(err)
    }
}
const getUserSessions = async(req, res, next) => {
    try{
        const dateFrom = req.params.dateFrom
        const dateTill = getTomorrow(req.params.dateTill)
        const response = await getSessions(dateFrom, dateTill)
        res.send(JSON.stringify(response))
        next()
    } catch(err){
        console.log(err)
        next(err)
    }
}
const deleteSession = async(req, res, next) => {
    try{ 
        const response = await deleteSessionById(req.body.id)
        !response ? next('error') : res.send(response)
    } catch (err){
        next(err)
    }
}

module.exports = { addSession, getUserSessions, deleteSession}