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
const getDateString = (date) =>{
    const dateObj = new Date(date)
    return dateObj.toISOString().slice(0, 10)
}
module.exports = {getTomorrow, stripTime, getDateString}