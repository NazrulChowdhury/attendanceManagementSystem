const AuthError = require("../helper/auth.error")
const ApiError = require("../helper/error")

const errorHandler = (error , req, res, next) =>{
    if(error instanceof ApiError){
        res.status(error.code).send(error)
        return
    }
    if(error instanceof AuthError){
        res.redirect(`${process.env.CLIENT_BASE_URL}/authFailure`)
    }
    res.status(500).send(ApiError.internal())
}
module.exports = errorHandler