const { getTomorrow } = require("../helper/date")
const { createSession ,getSessions } = require("../services/session.services")

const Test = async(req, res,next) => {
    // try{
    //     const dateFrom = req.params.dateFrom
    //     const dateTill = getTomorrow(req.params.dateTill)
    //     const response = await getSessions(dateFrom, dateTill)
    //     const responseArray = response.map(item => new Date(item.date).toString())
    //     res.send(responseArray)
    // } catch(err){
    //     console.log(err)
    // }
    try{
        const newSession = req.body
        const sessionCreated = await createSession(newSession)
        sessionCreated ? res.send('success!') : next('error')
    } catch(err){
        console.log(err)
        next(err)
    }

}    
module.exports = Test