import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import { message } from 'antd'
import ReactTimerStopwatch from './timer/ReactTimerStopwatch'

const StartSession = (params) => {
    const [activeSession, setActiveSession] = useState(false)
    const [isOn, setIsOn] = useState(false)
    const startSessionHandler = () => {
    setIsOn(true)
    startActiveSession()
    }
    const stopSessionHandler = () => {
        setIsOn(false)
        }
    const postActiveSession = async() => {
        return await axios({
            method : 'post',
            withCredentials : true,
            url : 'http://localhost:8080/session/startSession',
            data : {startTime : + new Date()}
        })
    }
    const {mutateAsync : startActiveSession} = useMutation(postActiveSession,{
        onSuccess : () => message.success('Session started!'),
        onError : (error) => {
            message.error(`Error! ${error}`) 
            setIsOn(false)
        }
    })
    const getActiveSession = async() => {
        return await axios('http://localhost:8080/session/getActiveSession', {withCredentials : true})
    }
    const {refetch : fetchActiveSession} = useQuery('getActiveSession', getActiveSession,{
        enabled : false,
        onSuccess : (data) => {
            const response = data.data
            response ? setActiveSession(data.data) : console.log('active session is', response)
        }
    })
    useEffect(() => {
        if(!activeSession) {fetchActiveSession()}
    }, [activeSession])
    console.log(activeSession)
    return (
        <div style = {{width : '700px'}}>
        <ReactTimerStopwatch 
          isOn={isOn} 
          className="react-stopwatch-timer__table" 
          displayCircle= {true} 
          displayHours={true}
          displayMinutes = {true}
          displaySeconds = {true}
          color="blue" 
          hintColor="red"
          activeSession = {activeSession}
        />
        <Button onClick = {startSessionHandler}>Start Session</Button>
        <Button onClick = { stopSessionHandler}>Stop Session</Button>
      </div>
    )
}
export default StartSession
