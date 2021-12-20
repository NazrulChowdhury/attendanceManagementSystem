import axios from "axios"
import { useState } from "react"
import { message } from 'antd'
import { useQuery, useQueryClient, useMutation } from "react-query"
import { formatSession, getDateString } from "../../../helper/time"
import './home.css'
import SessionCard from "./SessionCard";

const TodaysSessions = (params) => { 
    const [sessions, setSessions] = useState([])
    const queryClient = useQueryClient()
    const today = getDateString()

    const getTodaysSessions = async() => {
        const date = +new Date()
        return await axios(`/api/session/todaysSessions/${date}`,{withCredentials : true})
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
          url : '/api/session/deleteSession',
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
                        return(
                            <SessionCard 
                            key = {session.id}
                            session = {session}
                            triggerDeleteSession = {triggerDeleteSession}
                            />   
                        )       
                    })}
                </div>          
            </div> 

        </div>

    )
}
export default TodaysSessions