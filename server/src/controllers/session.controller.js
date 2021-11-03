const { getTomorrow } = require("../helper/date")
const { 
    createSession ,getUserSessions, 
    deleteSessionById , createActiveSession 
} = require("../services/session.services")

const addSession = async(req, res, next) => {
    try{
        const newSession = req.body
        newSession['user'] = req.user
        const sessionCreated = await createSession(newSession)
        sessionCreated ? res.send('success!') : next('error')
    } catch(err){
        next(err)
    }
}
const getSessions = async(req, res, next) => { 
    try{ 
        const dateFrom = req.params.dateFrom
        const dateTill = getTomorrow(req.params.dateTill)
        const response = await getUserSessions(dateFrom, dateTill, req.user)
        res.send(response)
        next()
    } catch(err){
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
// const startSession = async(req, res,next) => {
//     try{
//         const response = await createActiveSession(req.body.session)
//         !response ? next()
//     }
// }

module.exports = { addSession, getUserSessions, deleteSession, getSessions}