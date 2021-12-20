import { Button, message, Spin } from "antd"
import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

const RemoveUser = ({id, setShowModal}) => { 

    const queryClient = useQueryClient()

    const deleteUser = async() => {
        return await axios({
            method: 'post',
            url:'/api/admin/removeUser',
            withCredentials: true,
            data : {id}
        })
    }
    const {isLoading ,mutateAsync} = useMutation(deleteUser, { 
        onSuccess: (data) => { 
            setShowModal(false)
            message.success(data.data)
            queryClient.invalidateQueries('getUsers')
        },
        onError: (error) =>{ 
            setShowModal(false)
             message.error(`ERROR!! ${error.response.data}`)           
        }
    })
    return(
        <>
          <Button
             onClick={mutateAsync}
             style={{background : 'yellow', marginRight: '100px', borderRadius:'15px'}}
          >   
              {isLoading && <Spin />}
              Delete User
            </Button>
        </>
    )
}
export default RemoveUser