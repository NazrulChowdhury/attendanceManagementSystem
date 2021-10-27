const getTomorrow = (dateStamp)=>{
    const tomorrow = new Date(+dateStamp)
    tomorrow.setDate(tomorrow.getDate()+1)
    return tomorrow.getTime()
}
module.exports = {getTomorrow}