import axios from "axios"
import { useState } from "react"
import { Form, Modal, Button } from "react-bootstrap"
import { useMutation } from "react-query"
import { message, Spin } from 'antd'

const AddUser =() => {
    const [email, setEmail] = useState('')
    const [role, setRole] = useState(false)
    const [response, setResponse] = useState('')
    const [error, setError] = useState(false) 
    
    const addUser = async() => { 
      return await axios({
      method : 'post',
      url : 'api/admin/addUser',
      data : {email, role}
    })}

    const {isLoading, mutateAsync} = useMutation(addUser,{
      onSuccess : (data) => setResponse(data.data),
      onError : (error) => {
        setResponse('')
        setError(error.response.data)
        
      }
    })
  return(
  <>  { !response && !error &&
    <div  className = "flexRowCenter" style={{height: '80%', width: '90%'}}>
        
        <Form 
          onSubmit = {(e) => { 
              if(!role){
                  e.preventDefault()
                  message.error('please select a user role!')
                } else{
                  e.preventDefault()
                  mutateAsync()
                }
            }
          } 
          className="customForm flexColumnCenter"
        >
          <Form.Group  controlId="formBasicEmail" >
            <Form.Label>Add new User</Form.Label>
            <Form.Control 
              type="email" placeholder="Enter email" value = {email} required
              onChange = {(e) => setEmail(e.target.value)} 
              style = {{marginBottom: "10px"}}
            />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}
            onChange={(e)=> setRole(e.target.value)}
            >
              <Form.Check
                type="radio"
                label="admin"
                name = "role"
                value = "admin"
              />
              <Form.Check
                type="radio"
                label="user"
                name = "role"
                value = "user"
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" className="customButtonBlue"
           style = {{marginTop: "10px"}}
          >  {isLoading && <Spin />}
            Submit
          </Button>
        </Form>
    </div>}

    { response &&
      <div className = "flexRowCenter" style={{height: '100%', width: '100%', color: 'white'}}>       
          <Modal.Dialog  > 
            <Modal.Body style = {{background: '#6C09E2'}} className="flexRowCenter">
              <p> <b>{response}</b></p>
            </Modal.Body>
            <Modal.Footer style = {{background: '#6C09E2'}}>
              <Button variant="primary" className="customButtonBlue" 
                onClick = {() => {setResponse(''); setEmail('')}}> 
                Close
              </Button>
            </Modal.Footer >
          </Modal.Dialog>
        </div>
    }
        
    {error && 
      <div  className = "flexRowCenter" style={{height: '100%', width: '100%', color: 'white'}} >
        <Modal.Dialog > 
        <Modal.Body style={{ background: 'red' }} className="flexRowCenter">
          <p><b>{error.message}</b></p>
        </Modal.Body>
        <Modal.Footer style = {{background: '#6C09E2'}}>
          <Button variant="primary" className="customButtonBlue" 
            onClick = {() => {setResponse(''); setEmail(''); setError('')}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>             
    </div> 
  }
</>    
  )
}
export default AddUser