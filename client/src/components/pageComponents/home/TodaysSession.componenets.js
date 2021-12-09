import axios from "axios"
import { useState } from "react"
import Card from "react-bootstrap/Card"
import { Button, message } from 'antd';
import { useQuery, useQueryClient, useMutation } from "react-query"
import { formatSession, getDateString } from "../../../helper/time"
import './home.css'

const TodaysSessions = (params) => { 
    const [sessions, setSessions] = useState([])
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const queryClient = useQueryClient()
    const today = getDateString()

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

    return(
        <div className = 'sessionHeader flexRowCenter '> 
           <div className = 'flexColumnCenter '>
               <div>
                   <h5> {today} </h5>
                </div>
                <div> 
                    <h3>Todays Sessions</h3>
                </div>
                 {sessions.length === 0 && <div style = {{ color: '#05E9EE'}}> No Session Today...</div>}
                <div> 
                    {sessions.length !== 0 && sessions.map(session => { 
                        return (
                            <Card style={{  background : '#6C09E2',border: 'none', margin: '0px'}}>
                                <Card.Body 
                                key = {session.id}
                                style ={{
                                    background : 'lightBlue',
                                    margin: '10px', 
                                    borderRadius : '5px'}}
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
                                </Card.Body>           
                            </Card> 
                        )                
                    })}
                </div>          
            </div> 

        </div>

    )
}
export default TodaysSessions

            {/* <div> 
                {sessions.length !== 0 && sessions.map(session => { {<p>getting called here</p>}
                        <Card style={{  background : '#6C09E2',overflowY: 'scroll'}}>
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
                            </Card.Body>           
                        </Card>                 
                })}
            </div>           */}


        // <Card style={{  background : '#6C09E2',overflowY: 'scroll'}}>
        //     { sessions.length > 0 && sessions.map(session =>{ 
        //     return ( 
        //     <Card.Body 
        //     key = {session.id}
        //     style ={{background : 'lightBlue',margin: '20px', borderRadius : '5px'}}
        //     onClick = {() => setShowDeleteButton(!showDeleteButton) }>
        //         <Card.Title>Duration {session.sessionLength} hh:mm</Card.Title>
        //         <Card.Text>
        //         Start Time: {session.startTime}  <br />
        //         Stop Time: {session.endTime} 
        //         </Card.Text>
        //         {showDeleteButton && 
        //             <Button style = {{background : '#6C09E2', color: 'white', borderRadius: '20px'}}
        //             onClick = {() => triggerDeleteSession(session.id)}
        //             >Delete</Button>}
        //     </Card.Body> )
        // })}            
        // </Card>