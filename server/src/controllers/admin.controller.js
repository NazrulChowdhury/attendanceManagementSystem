const { firstDayOfTheMonth, lastDayOfTheMonth, getTomorrow } = require('../helper/date')
const ApiError = require( '../helper/error')
const adminService = require('../services/admin.services')
const { getUserSessions, getSessionTotal } = require('../services/session.services')

const addUser = async(req, res, next) => { 
    const {email, role} = req.body
    try{
        const emailExists = await adminService.inviteEmailExist(email)
        if(emailExists) {
           next(ApiError.badRequest(409,'user email already exists!'))
           return
        }
        const inviteEmail = await adminService.createInviteEmail(email, role)
        inviteEmail ? res.send('done!') : next(ApiError.internal())
        next()
    } catch(error){
        next(error)
    }

}
const getUsers = async(req, res, next) => {
    try{
        const users = await adminService.getAllUsers()
        !users ? next('error') : res.send(users)
    } catch(error){
        next (error)
    }
}
const updateUser = async(req, res, next)=>{
    const {id, role} = req.body
    try{
        const status = await adminService.updateUserRole(id, role)
        status ? res.send('Success!') : next('error')
    }catch(error){
        next(error)
    }
}
const getSelectedSessions = async(req, res,next)=>{ 
    const {id, month, year} = req.body
    const dateFrom = + new Date(firstDayOfTheMonth(year, month))
    const dateTill = getTomorrow(lastDayOfTheMonth(year,month))
    try{
        const sessions = await getUserSessions(dateFrom, dateTill, id)
        const sessionTotal = await getSessionTotal(sessions)
        !sessionTotal.length ? next(ApiError.badRequest(401,'This user has no session for this period!')) :
        res.send(sessionTotal)
    }catch(error){
        next(error)
    }
}
module.exports = {
    addUser, 
    getUsers, 
    getUsers, 
    updateUser,
    getSelectedSessions
}


