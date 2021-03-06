import { Table, Button,Spin } from "antd"
import { useState } from "react"
import { useQuery } from "react-query"
import { getUsers } from "../../hooks"
import UpdateUser from "./UpdateUser"

const UserList = (params) => { 
    const [page, setPage] = useState(1)
    const [users, setUsers] = useState(false)
    const [selectedUser, setSelectedUser] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Role',
          dataIndex: 'role',
        },
        {
          title: 'Action',
          dataIndex: 'action',
        },
      ]
      
      const data = []
      if(users){
        users.map(user =>{
          const {_id, firstName, lastName,email,role} = user
          data.push({
            key : _id,
            name: `${firstName} ${lastName}`,
            email,
            role,
            action : 
              <Button 
                className="customButton"
                onClick={() => editUserInfo(_id)}
              > 
                 Edit 
              </Button>
          })
        })
      } 
  
    const {loading} = useQuery('getUsers', getUsers,{ 
      onSuccess : (data) => setUsers(data.data)
    })
    const editUserInfo = (id) =>  {
      setSelectedUser(users.find(user => id == user._id))
      setShowModal(true)
    }

      return ( 
        <div className="flexRowCenter" style={{height: '95%', width: '100%', marginTop: '10px' }}>
          {loading || !data.length  && <div> <Spin size="large" /> </div>}
          {!loading && data.length && 
            <div>
              <Table 
                dataSource={data} 
                columns={columns} 
                pagination = {{
                    current: page,
                    pageSize : 9,
                    onChange: (page)=> setPage(page)
                }}
              /> 
            </div>
          }
            <div className="flexRowCenter">
              <UpdateUser 
                {...selectedUser}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </div> 
          
        </div>
      )
}
export default UserList