import { Button, message, Spin } from "antd"
import axios from "axios"
import { useState } from "react"
import {Modal, Form} from "react-bootstrap"
import { useMutation, useQueryClient } from "react-query"


const UpdateUser = ({_id, firstName, lastName, email, role,showModal, setShowModal}) => {

    const [updatedRole, setUpdatedRole] = useState(false)
    const handleClose = () => setShowModal(false)
    const queryClient = useQueryClient()
    const updateUser = async() => {
        return await axios({
            method: 'post',
            withCredentials: true,
            url : 'api/admin/updateUser',
            data : {
                id: _id,
                role: updatedRole
            }
        })
    }
    const {isLoading, mutateAsync} = useMutation('updateUser', updateUser, {
        onSuccess: (data) => {
            message.success(data.data)
            setShowModal(false)
            queryClient.invalidateQueries('getUsers')
        },
        onError : (error) => {
            setShowModal(false)
            message.error(`ERROR! ${error}`)
        }
    })

    return(
        <>
            <Modal show={showModal} onHide={handleClose} style = {{ color : '#05E9EE'}}>
            <Modal.Header closeButton style = {{background : '#6C09E2'}}>
                <Modal.Title >Update User Info</Modal.Title>
            </Modal.Header>
            <Modal.Body style = {{background : '#6C09E2'}}>
                Firstname : {firstName} <br />
                Lastname : {lastName} <br />
                Email : {email} <br />
                Current Role : {role} <br /> <br /> <br />
                
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}
                     onChange={(e)=> setUpdatedRole(e.target.value)}
                >    <p>Update Role : </p>
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
            </Modal.Body>
            <Modal.Footer style = {{background : '#6C09E2'}}>
                <Button className="customButtonRed" onClick={handleClose}>
                   Close
                </Button>
                <Button className="customButtonBlue" onClick={mutateAsync}  >
                    {isLoading && <Spin />}
                Save Changes
                </Button>
            </Modal.Footer>
            </Modal>
      </>
    )
}
export default UpdateUser