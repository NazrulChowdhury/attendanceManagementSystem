const getTomorrow = (dateStamp)=>{
    const tomorrow = new Date(+dateStamp)
    tomorrow.setDate(tomorrow.getDate()+1)
    return tomorrow.getTime()
}

const stripTime = (targetDate) => {
    const date = new Date(targetDate)
    date.setHours(0, 0, 0, 0)
    return +new Date(date)
}
module.exports = {getTomorrow, stripTime}