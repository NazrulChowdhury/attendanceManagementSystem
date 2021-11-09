import axios from "axios"
import { useState } from "react"
import Card from "react-bootstrap/Card"
import { Button, message } from 'antd';
import { useQuery, useQueryClient, useMutation } from "react-query"
import { formatSession } from "../../../helper/time"
import './home.css'

const TodaysSessions = (params) => { 
    const [sessions, setSessions] = useState([])
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const queryClient = useQueryClient()

    const getTodaysSessions = async() => {
        const date = +new Date()
        return await axios(`/session/todaysSessions/${date}`,{withCredentials : true})
    }
    const {data} = useQuery('getTodaysSessions',getTodaysSessions,{
        onSuccess: (data) => {
            const sessions = formatSession(data.data)
            setSessions(sessions)
        }
    })
    const deleteSession = async(id) => {
        return await axios({
          method : 'delete',
          url : '/session/deleteSession',
          data : {id}
        })
      }
    const {isLoading, mutateAsync:triggerDeleteSession} = useMutation(deleteSession, {
        mutationKey : 'deleteSession',
        onSuccess : () => {
          message.success('SUCCESS!')
          queryClient.invalidateQueries('getTodaysSessions')
        },
        onError : (error) => message.error(`Error! ${error}`)
      })
      console.log('deleteSession', deleteSession)
    return(
        <Card style={{ width: '18rem', height : '300px', background : '#6C09E2',overflowY: 'scroll'}}>
            { sessions.length > 0 && sessions.map(session =>{ 
            return ( 
            <Card.Body 
            key = {session.id}
            style ={{background : 'lightBlue',margin: '20px', borderRadius : '5px'}}
            onClick = {() => setShowDeleteButton(!showDeleteButton) }>
                <Card.Title>Duration {session.sessionLength} hh:mm</Card.Title>
                <Card.Text>
                Start Time: {session.startTime}  <br />
                Stop Time: {session.endTime} 
                </Card.Text>
                {showDeleteButton && 
                    <Button style = {{background : '#6C09E2', color: 'white', borderRadius: '20px'}}
                    onClick = {() => triggerDeleteSession(session.id)}
                    >Delete</Button>}
            </Card.Body> )
        })}            
        </Card>
    )
}
export default TodaysSessions


{/* <Card style={{ width: '18rem', height : '300px', background : '#6C09E2'}}>
{ sessions.length > 0 && sessions.map(session =>{ 
<Card.Body style ={{background : 'lightBlue',margin: '20px', borderRadius : '5px'}}>
    <Card.Title>session length : </Card.Title>
    <Card.Text>
    Some quick example text 
    </Card.Text>
</Card.Body>
}) }            
</Card> */}