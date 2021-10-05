const ApiError = require("../helper/error")

const errorHandler = (error , req, res, next) =>{
    if(error instanceof ApiError){
        res.status(error.code).send(error)
        return
    }
    res.status(500).send(ApiError.internal())
}
module.exports = errorHandler