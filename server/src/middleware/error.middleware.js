const AuthError = require("../helper/auth.error")
const ApiError = require("../helper/error")

const errorHandler = (error , req, res, next) =>{
    if(error instanceof ApiError){
        res.status(error.code).send(error.message)
        return
    }
    if(error instanceof AuthError){
        res.redirect(`${process.env.CLIENT_BASE_URL}/authFailure`)
    }
    res.status(500).send('Opps! Something went wrong..')
}
module.exports = errorHandler