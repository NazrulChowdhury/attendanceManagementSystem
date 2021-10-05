class ApiError {
    constructor(code, message, fields){
        this.code = code
        this.message = message
        this.fields = fields
    }

    static badRequest(code, message, fields){
        return new ApiError(code, message, fields)
    }

    static internal(){
        return new ApiError('500', 'opps! something went wrong!')
    }
}
module.exports = ApiError