const moment = require('moment')

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
    //return dateObj.toISOString().slice(0, 10)
    return moment(dateObj).format("YYYY-MM-DD")
}
const firstDayOfTheMonth = (year, month)=>{ 
   return new Date(year, month, 1)
}
const lastDayOfTheMonth = (year,month) => {
    if(month == 11 || 2 || 9){ return new Date(year, month, 31)}
    return  new Date(year, month +1, 0)
}
module.exports = {
    getTomorrow, 
    stripTime, 
    getDateString,
    firstDayOfTheMonth,
    lastDayOfTheMonth
}