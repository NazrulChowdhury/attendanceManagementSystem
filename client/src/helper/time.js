import moment from "moment";

export const formatSession = (data) => {
  return data.map(item =>{
      return {
        id: item._id,
        date : item.date,
        startTime : moment(item.startTime).format("HH:mm"),
        endTime : moment(item.endTime).format("HH:mm"),
        sessionLength : moment.utc(item.sessionLength).format("HH:mm")
      }
  })
}

export const checkOverlap = (sessionArray,startTime,endTime) => {
  return sessionArray.filter(session =>{
    if (session.startTime <= endTime && startTime < session.endTime) {
      return session
    }
  })
}
export const stripTime = (dateTime) => {
    const date = new Date(dateTime.getTime())
    date.setHours(0, 0, 0, 0)
    return +new Date(date)
}
export const timeDiffCalc = (startTime, endTime) => {
    let diffInMilliSeconds = Math.abs(endTime - startTime)/1000     
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24
    diffInMilliSeconds -= hours * 3600
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60
    diffInMilliSeconds -= minutes * 60
    const seconds = Math.floor(diffInMilliSeconds)
    return {
    hours, 
    minutes,
    seconds 
    }
}
export const getDateString = () =>{
  var dateObj = new Date()
  var month = dateObj.getUTCMonth() + 1
  var day = dateObj.getUTCDate()
  var year = dateObj.getUTCFullYear()
  return day + "/" + month + "/" + year
}
export const currentMonth = () => {
  const month = new Date().getMonth()
  return month
}
export const thisYear = () => {
  const year = new Date().getFullYear()
  return year
}
export const lastYear = () => {
  const year = new Date().getFullYear()-1
  return year
}
export const msToTime = (duration) =>{
  const result = Math.floor(duration/(1000*60*60)) 
   + " hours " + Math.floor(duration/(1000*60))%60 + " Minutes"
   return result
}
export const formatTotalTime = (sessions) => {
  const totalTime = sessions.reduce((acc,obj) => acc += obj.value, 0)
  //const formattedTotal = moment.utc(totalTime).format("HH:mm")
  const formattedTotal = msToTime(totalTime)
  return formattedTotal
}