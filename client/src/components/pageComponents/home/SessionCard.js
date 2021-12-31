import Card from "react-bootstrap/Card"
import { Button } from 'antd'
import { useState } from "react"
import axios from "axios"
import { useMutation } from "react-query"
import { message, Spin } from 'antd'
import { useGlobalContext } from "../../../context/context"

const SessionCard = ({session, id}) => {
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { refetchSessions, refetchHeatMap } = useGlobalContext()
  
    const deleteSession = async(id) => { 
        return await axios({
          method : 'delete',
          url : '/api/session/deleteSession',
          withCredentials : true, 
          data : {id}
        })
      }
    const {isLoading, mutateAsync} = useMutation(deleteSession, { 
        mutationKey : 'deleteSession',
        onSuccess : () => {
          message.success('SUCCESS!')
          refetchSessions()
          refetchHeatMap()
        },
        onError : (error) => message.error(`Error! ${error}`) 
      })
    return (
        <Card className="customCard">
            <Card.Body 
            className="customCardBody"
            onClick = {() => setShowDeleteButton(!showDeleteButton) }
            >
                <Card.Title>Duration {session.sessionLength} &nbsp;
                    <span style={{fontSize: '15px'}}>
                     hh:mm
                    </span>
                </Card.Title>
                <Card.Text>
                    Start Time: {session.startTime}  <br />
                    Stop Time: {session.endTime} 
                </Card.Text>
                {showDeleteButton && 
                    <div className="flexRowCenter">
                        <Button className="customButton"
                            onClick = {() => mutateAsync(id)}
                        >
                            {isLoading && <Spin />}
                            Delete
                        </Button>
                    </div>
                }
            </Card.Body>           
        </Card> 
    )
}
export default SessionCard