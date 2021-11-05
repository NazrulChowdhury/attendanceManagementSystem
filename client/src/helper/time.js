import moment from "moment";

export const formatSession = (data) => {
  return data.map(item =>{
      return {
        id: item._id,
        date : item.date,
        startTime : moment(item.startTime).format("hh:mm"),
        endTime : moment(item.endTime).format("hh:mm"),
        sessionLength : moment.utc(item.sessionLength).format("hh:mm")
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
    
    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24
    diffInMilliSeconds -= hours * 3600;
    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60
    diffInMilliSeconds -= minutes * 60;
    // calculate seconds
    const seconds = Math.floor(diffInMilliSeconds)

    return {
    hours, 
    minutes,
    seconds 
    }
}