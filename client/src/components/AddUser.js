import axios from "axios"
import { useState } from "react"
import { Form, Button, Modal } from "react-bootstrap"
import { useMutation } from "react-query"
import { server } from "../config/server"

const AddUser =() => {
    const [email, setEmail] = useState('')
    const [response, setResponse] = useState('')
    const addUser = async() => { 
      return await axios({
      method : 'post',
      url : `${server.baseUrl}/addUser`,
      data : {email}
    })}
    const mutateAddUser = (e) => {
        e.preventDefault()
        mutateAsync()
    }
    const {isLoading, error, mutateAsync} = useMutation(addUser,{
      onSuccess : (data) => setResponse(data.data)
    })
  return(
    <>
      <Form onSubmit = {mutateAddUser} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Add User</Form.Label>
        <Form.Control 
           type="email" placeholder="Enter email" value = {email} required
           onChange = {(e) => setEmail(e.target.value)} 
        />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
      { response &&
      <Modal.Dialog> 
        <Modal.Body>
          <p>{response}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Close</Button>
        </Modal.Footer>
      </Modal.Dialog>}
    </>
  )
}
export default AddUser