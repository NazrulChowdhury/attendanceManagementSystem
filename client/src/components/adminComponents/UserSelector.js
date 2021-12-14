import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react"
import { getUsers } from "../../hooks"
import { useQuery } from "react-query"
import { currentMonth, lastYear, thisYear } from "../../helper/time"
import axios from "axios"

const UserSelector = () => {

    const [selectedUser, setSelectedUser] = useState(false) 
    const [users, setUsers] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
    const [selectedYear, setSelectedYear] = useState(thisYear())
    const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]

    const {loading, refetch} = useQuery('getAllUsers', getUsers,{
        enabled: false,
        onSuccess : (data) => setUsers(data.data) 
    })

    useEffect(() => refetch(),[])
    return (
        <div  className = "flexRowCenter" style={{height: '80%', width: '90%'}}>
        
        <Form 
         // onSubmit = {} 
          className="customForm flexColumnCenter"
        >   <div>
                <Form.Label><b>View user sessions record</b></Form.Label>
                <Form.Select aria-label="Default select example"
                  onChange = { (e) => setSelectedUser(e.target.value)}
                  className="formSelectMenu"
                >
                    <option>select User</option>
                    {users && users.map(user => <option key= {user._id} value= {user._id}> {user.firstName} </option>)} 
                </Form.Select>
 
                <Form.Select aria-label="Default select example"
                  onChange = { (e) => setSelectedMonth(e.target.value)}
                  className="formSelectMenu"
                >
                    <option >{months[currentMonth()]}</option> 
                   {months.map((month,index) => <option key={index} value={index}>{months[index]}</option>)}
                </Form.Select>

                <Form.Select aria-label="Default select example"
                onChange = { (e) => setSelectedYear(e.target.value)}
                >
                    <option>{selectedYear}</option>
                    <option value={lastYear()}>{lastYear()}</option>
                </Form.Select>
                <div className="flexRowCenter">                
                    <Button className="customButtonBlue" type="submit"
                    style = {{marginTop: "20px"}}
                    >
                        Submit
                    </Button>
                </div> 
            </div>
        </Form>
    </div>
    )
}
export default UserSelector