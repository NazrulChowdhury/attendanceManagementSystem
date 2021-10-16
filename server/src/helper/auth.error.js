class AuthError {
    constructor(code, message){
        this.code = code;
        this.message = message
    }
    static badRequest (code, message) {
        return new AuthError(code, message)
    }
}
module.exports = AuthError