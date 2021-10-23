import { Modal } from "react-bootstrap"

const MyModal = ({color, message}) => {
 return(
    <Modal.Dialog > 
        <Modal.Body style={color}>
        <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick = {() => {setResponse(''); setEmail(''); setError('')}}>Close</Button>
        </Modal.Footer>
    </Modal.Dialog>
 )   
}