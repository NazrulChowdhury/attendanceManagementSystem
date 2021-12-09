import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { message, Spin } from 'antd'
import ReactTimerStopwatch from './timer/ReactTimerStopwatch'

const StartSession = (params) => {
    const [timeFrom, setTimeFrom] = useState(false)
    const [isOn, setIsOn] = useState(false)
    const [sessionActivated, setSessionActivated] = useState(false)
    const queryClient = useQueryClient() 
    const startSessionHandler = () => {
    setIsOn(true)
    setTimeFrom(+new Date())
    startActiveSession()
    }
    const stopSessionHandler = () => {
        stopActiveSession()
        setIsOn(false)
    }
    const postActiveSession = async() => {
        return await axios({
            method : 'post',
            withCredentials : true,
            url : '/session/startSession',
            data : {startTime : +new Date()}
        })
    }
    const {mutateAsync : startActiveSession} = useMutation(postActiveSession,{
        onSuccess : () => {
            message.success('Session started!')
            setSessionActivated(true)
            },
        onError : (error) => {
            message.error(`Error! ${error}`) 
            setIsOn(false)
        }
    })
    const getActiveSession = async() => {
        return await axios('/session/getActiveSession', {withCredentials : true})
    }
    const {refetch : fetchActiveSession} = useQuery('getActiveSession', getActiveSession,{
        enabled : false,
        onSuccess : (data) => {
            const response = data.data
            if(response){
                setTimeFrom(response.startTime)
                setIsOn(true)
            }
        }
    }) 
    const stopSession = async() => {
        return await axios({
            method : 'post',
            url : '/session/stopSession',
            withCredentials : true,
            data : {
                sessionLength : +new Date() - timeFrom, 
                stopTime : +new Date()
            }
        })
    }
    const {mutateAsync : stopActiveSession} = useMutation(stopSession, {
        onSuccess : (data) => {
            message.success(data.data) 
            setSessionActivated(false)
            queryClient.invalidateQueries('getTodaysSessions')
        },
        onError : (error) => { message.error(`Error! ${error}`)}
    })
    useEffect(() => {
        if(!timeFrom) { fetchActiveSession() }
        if(timeFrom) { setSessionActivated(true)}
    }, [timeFrom])
    return (
        < >
        <ReactTimerStopwatch 
          isOn={isOn} 
          className="react-stopwatch-timer__table" 
          displayCircle= {true} 
          displayHours={true}
          displayMinutes = {true}
          displaySeconds = {true}
          color="#05E9EE" 
          hintColor="red"
          timeFrom = {timeFrom}
        /> 
        <div className='flexRowCenter' style={{marginTop : '15px'}}>
            { sessionActivated && <Button style = {{marginRight: '5px'}} variant="success" disabled >Start Session</Button>}
            {!sessionActivated && <Button style = {{marginRight: '5px'}} variant="success" onClick = {startSessionHandler}>Start Session</Button>}
            {sessionActivated && <Button style = {{marginLeft: '5px'}} variant="danger" onClick = { stopSessionHandler}>Stop Session</Button>}
            {!sessionActivated && <Button style = {{marginLeft: '5px'}} variant="danger" disabled>Stop Session</Button>}
        </div>
      </>
    )
}
export default StartSession






