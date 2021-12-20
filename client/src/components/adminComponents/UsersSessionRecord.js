import Form from "react-bootstrap/Form"
import { useEffect, useState } from "react"
import { getUsers } from "../../hooks"
import { useMutation, useQuery } from "react-query"
import { thisYear } from "../../helper/time"
import axios from "axios"
import { message, Spin } from "antd"
import SessionTable from "./SessionTable"
import UserDetails from "./UserDetails"
import { IoArrowBackCircle } from "react-icons/io5"
import UserSelector from "./UserSelector"
import DownloadTimeSheet from "./DownloadTimeSheet"

const UsersSessionRecord = () => { 

    const [selectedUser, setSelectedUser] = useState(false) 
    const [users, setUsers] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
    const [selectedYear, setSelectedYear] = useState(thisYear())
    const [sessions, setSessions] = useState(false)
    const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]

    const getMonthlySessions = async() => {
        return axios('/api/admin/getSelectedUserSessions',{
            method : 'post',
            withCredentials: true,
            data : {
                id : selectedUser,
                month : selectedMonth,
                year : selectedYear
            }
        })
    }
    const {loading, refetch} = useQuery('getAllUsers', getUsers,{
        enabled: false,
        onSuccess : (data) => setUsers(data.data) 
    })
    const {isLoading, mutateAsync} = useMutation(getMonthlySessions,{
        onSuccess : (data) => setSessions(data.data),
        onError : (error) => message.error(`ERROR! ${error.response.data}`)
    })
    
    useEffect(() => refetch(),[])
    if(loading){
        return (
            <div className = "flexRowCenter fullPageDiv"> 
              <Spin size="large"/>
            </div>
        )
    } 
    return (
        <div className="fullPageDiv">
            {!sessions && 
                <div  className = "flexRowCenter" style={{height: '80%', width: '90%'}}>        
                    <Form 
                        onSubmit = {
                            (e) => {
                                e.preventDefault()
                                if(!selectedUser || selectedUser == '0'){                       
                                    message.error('Please select a user!')
                                } else{
                                    mutateAsync()
                                }
                            }
                        } 
                        className="customForm flexColumnCenter"
                    >   
                        <div>
                            <UserSelector 
                                users = {users} months={months} setSelectedUser={setSelectedUser}
                                setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear}
                                isLoading = {isLoading}
                            />
                        </div>                
                    </Form>
                </div>
            }
           {sessions &&
                <div className="flexRowCenterEvenly">
                    <div id="listOwnerContainer">
                        <UserDetails 
                            users = {users}
                            id = {selectedUser}
                            month = {months[selectedMonth]}
                            sessions = {sessions}
                        />
                        <div style = {{marginTop: '10px'}} className="flexRowCenterEvenly">
                            <div className="hoverBlue">
                                <IoArrowBackCircle 
                                    size={'50px'}
                                    onClick={()=> setSessions(false)}
                                />
                            </div>
                            <div className="hoverBlue">
                                <DownloadTimeSheet 
                                  id = {selectedUser}
                                  month = {months[selectedMonth]}
                                />    
                            </div>                                  
                        </div>
                    </div>
                    <div style = {{marginTop: '50px', width:'40%'}} >
                        <SessionTable sessions={sessions}/>
                    </div>            
                </div>
            }
        </div>
    )
}
export default UsersSessionRecord