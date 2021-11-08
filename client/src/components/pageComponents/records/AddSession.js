import { TimePicker } from "antd"
import axios from "axios"
import moment, { duration } from "moment"
import { useEffect, useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { Alert, Spin,message } from 'antd';
import { useMutation, useQueryClient } from "react-query"

const AddSession = ({setShowModal, setShowCalendar, sessionDate}) => {
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState('')
    const [sessionLength, setSessionLength] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const queryClient = useQueryClient()

    const createSessionObj = () => {
        return {
            date : +new Date(sessionDate),
            startTime : +new Date(moment(startTime).toDate()),
            endTime : +new Date(moment(endTime).toDate()),
            sessionLength 
        }
    }
    const submitSession = async(e) => {
       e.preventDefault()  
       const newSession =  createSessionObj()
       return await axios({
           method : 'post',
           url :'/session/addSession', 
           withCredentials: true,
           data : newSession})
    }
    const{isLoading, mutateAsync} = useMutation(submitSession,{
        mutationKey : 'submitSession',
        onSuccess : () => {
            message.success('SUCCESS!')
            setShowModal(false)
            setShowCalendar(true)
            queryClient.invalidateQueries('fetchSessions')
        },
        onError : (error) => {message.error(`Error! ${error.message}`)}
    })
    useEffect(() => {
       if(startTime && endTime){
         const sessionLength = moment(endTime).diff(moment(startTime))+60000
            if(sessionLength < 1){
                setAlertMessage('session cannot have negative value!')
                setShowAlert(true)} else{
                setSessionLength(sessionLength)
            }
        }
    }, [startTime, endTime])
    
    
    return (
        <>  
            <Modal.Dialog> 
                <Modal.Header style = {{"backgroundColor" : "#6C09E2"}}>
                <Modal.Title style = {{"color" : "white"}}>Add new Session</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form onSubmit ={(e) => sessionLength? mutateAsync(e) : e.preventDefault()}>
                    <Form.Group>
                        <Form.Label>Start Time</Form.Label>
                        <TimePicker 
                        format={'HH:mm'}
                            value={startTime}
                            onChange={time => setStartTime(time)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Time  </Form.Label>
                        <TimePicker 
                        format={'HH:mm'}
                            value={endTime}
                            onChange={time => setEndTime(time)}
                        />
                    </Form.Group>                    

                    <Button variant="primary" type="submit">
                        {isLoading && <Spin />}
                        Submit
                    </Button>
                </Form>
                </Modal.Body>

                <Modal.Footer style = {{"backgroundColor" : "#6C09E2"}}>
                <Button variant="danger"
                onClick = {() => {setShowModal(false); setShowCalendar(true)}}
                >Cancel</Button>             
                </Modal.Footer>
            </Modal.Dialog> 

            {showAlert && (
            <Alert
                message="Warning"
                description= {alertMessage}
                type="warning"
                showIcon
                closable
            />
            )}
        </>

    )
}
export default AddSession
