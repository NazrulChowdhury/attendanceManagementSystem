const authenticate = (req,res,next)=>{
    const customError = new Error('you are not logged in');
    customError.statusCode = 401;
    (!req.user) ? next(customError) : next()
}
module.exports = authenticate