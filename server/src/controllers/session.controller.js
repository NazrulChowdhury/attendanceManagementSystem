const { getTomorrow , stripTime } = require("../helper/date")
const sessionService = require("../services/session.services")

const addSession = async(req, res, next) => {
    try{
        const newSession = req.body
        newSession['user'] = req.user
        const sessionCreated = await sessionService.createSession(newSession)
        sessionCreated ? res.send('success!') : next('error')
    } catch(err){
        next(err)
    }
}
const getSessions = async(req, res, next) => { 
    try{ 
        const dateFrom = req.params.dateFrom
        const dateTill = getTomorrow(req.params.dateTill)
        const response = await sessionService.getUserSessions(dateFrom, dateTill, req.user)
        res.send(response)
        next()
    } catch(err){
        next(err)
    }
}
const deleteSession = async(req, res, next) => {
    try{ 
        const response = await sessionService.deleteSessionById(req.body.id)
        !response ? next('error') : res.send(response)
    } catch (err){
        next(err)
    }
}
const startSession = async(req, res,next) => {
    const session = {user : req.user, startTime : req.body.startTime}
    try{
        const response = await sessionService.createActiveSession(session)
        response ? res.send('SUCCESS!') : next('error')
    } catch(err){
        next(err)
    }
}
const stopSession = async(req, res, next) => { 
    try{
        const{startTime} = await sessionService.getActiveSession(req.user)
        if(startTime) { 
            await sessionService.deleteActiveSession(req.user)
         } else {
              next('error')
              return
            }
        const sessionDate = stripTime(startTime)
        const newSession = {
            user : req.user,
            date : sessionDate,
            startTime : startTime,
            endTime : req.body.stopTime,
            sessionLength : req.body.sessionLength
        }
        const sessionAdded = await sessionService.createSession(newSession)
        sessionAdded ? res.send('Session Completed!') : res.send('error')
    }catch(err){
        next(err)
    }
}
const getActiveSession = async(req, res, next) => {
    try{
        const activeSession = await sessionService.getActiveSession(req.user)
        activeSession ? res.send({startTime : activeSession.startTime}) : res.send(false)
    } catch (err){
        next(err)
    }
}

module.exports = { 
    addSession, deleteSession, 
    getSessions, startSession, 
    stopSession, getActiveSession
}