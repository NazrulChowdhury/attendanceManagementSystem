const { getUser } = require('../services/user.services')

require('dotenv').config()

const logout = (req, res) => {
  req.logout()
  req.session.destroy((err) => {
   // res.clearCookie('connect.sid')
    res.send(false)
  })
}
const getUserStatus = async(req, res, next) => {
  const id = req.user 
  console.log('req.user----->>>>', id)
  console.log('req session......----->>>', req.session)
  const status = {
    isAdmin : false,
    isLoggedIn : false
  }
  if(!id) {
    res.send(status)
    return
  }
  try{ 
    const user = await getUser(id)
    if(!user) {
      next('error') 
      return
    }
    const admin = user.role === 'admin' ? true : false
    res.send({
      isAdmin : admin,
      isLoggedIn : true
     })
  } catch(error){
    next(error)
  }
}
module.exports = {
  logout,
  getUserStatus
}