import Card from "react-bootstrap/Card"
import { Button } from 'antd'
import { useState } from "react"

const SessionCard = ({session,triggerDeleteSession}) => {
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    return (
        <Card className="customCard">
            <Card.Body 
            className="customCardBody"
            key = {session.id}
            onClick = {() => setShowDeleteButton(!showDeleteButton) }
            >
                <Card.Title>Duration {session.sessionLength} hh:mm</Card.Title>
                <Card.Text>
                    Start Time: {session.startTime}  <br />
                    Stop Time: {session.endTime} 
                </Card.Text>
                {showDeleteButton && 
                    <div className="flexRowCenter">
                        <Button className="customButton"
                        onClick = {() => triggerDeleteSession(session.id)}
                        >Delete</Button>
                    </div>
                }
            </Card.Body>           
        </Card> 
    )
}
export default SessionCard