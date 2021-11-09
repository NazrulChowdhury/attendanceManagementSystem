import axios from "axios"
import { useState } from "react"
import { Form, Button, Modal, Alert } from "react-bootstrap"
import { useMutation } from "react-query"

const AddUser =() => {
    const [email, setEmail] = useState('')
    const [response, setResponse] = useState('')
    const [error, setError] = useState('')
    
    const addUser = async() => { 
      return await axios({
      method : 'post',
      url : '/addUser',
      data : {email}
    })}

    const {isLoading, mutateAsync} = useMutation(addUser,{
      onSuccess : (data) => setResponse(data.data),
      onError : (error) => {
        setResponse('')
        setError(error.response.data)
        
      }
    })
  return(
    <>
      { !response && !error &&
      <Form onSubmit = {(e) => { e.preventDefault(); mutateAsync()}} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Add User</Form.Label>
        <Form.Control 
           type="email" placeholder="Enter email" value = {email} required
           onChange = {(e) => setEmail(e.target.value)} 
        />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>}
      { response &&
      <Modal.Dialog > 
        <Modal.Body >
          <p>{response}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick = {() => {setResponse(''); setEmail('')}}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>}
      {error && 
      <Modal.Dialog > 
      <Modal.Body style={{ background: 'red' }}>
        <p>{error.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick = {() => {setResponse(''); setEmail(''); setError('')}}>Close</Button>
      </Modal.Footer>
    </Modal.Dialog>
      }
    </>
  )
}
export default AddUser