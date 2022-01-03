const moment = require('moment')

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
    const dateFrom = moment([year, month])
    const dateTill =  moment(dateFrom).endOf('month')
    const start = +new Date(dateFrom.toDate())
    const end = +new Date(dateTill.toDate())
    try{
        const sessions = await getUserSessions(start, end, id)
        const sessionTotal = await getSessionTotal(sessions)
        !sessionTotal.length ? next(ApiError.badRequest(401,'This user has no session for this period!')) :
        res.send(sessionTotal)
    }catch(error){
        next(error)
    }
}
const getUserFullName = async(req, res, next)=>{
    const id = req.params.id
    try{
        const userFullName = await adminService.getUserFullName(id)
        !userFullName ? next(ApiError.badRequest(409, 'user not found!')) : res.send(userFullName)
    }catch(error){
        next(error)
    }
}
const removeUser = async(req, res, next) => {
    const {id} = req.body
    try{
        await adminService.removeUser(id)
        await adminService.removeAllSessions(id)
        res.send('Success!')
    } catch(error){
        next(error)
    }
}

module.exports = {
    addUser, 
    getUsers, 
    getUsers, 
    updateUser,
    getSelectedSessions,
    getUserFullName,
    removeUser
}


