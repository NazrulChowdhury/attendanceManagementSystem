const ApiError = require("../helper/error")
const { inviteEmailExist, clearInvite } = require("../services/user.services")

const Test = async(req, res,next) => {
     const email = req.body.email
     const isInvited = await inviteEmailExist(email) 
     res.send(isInvited) 
    // const result = await clearInvite(email)
    // if(result.deletedCount == 0){
    //     next(ApiError.internal())
    //     return
    // } else {
    //     res.send('deleted!')
    // }
    // const result = await inviteEmailExist(email)
    // console.log(result)
}    
module.exports = Test