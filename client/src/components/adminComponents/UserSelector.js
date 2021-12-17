import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Spin } from "antd"
import { currentMonth, lastYear, thisYear } from "../../helper/time"
const UserSelector = ({users, months, setSelectedUser, setSelectedMonth, setSelectedYear,isLoading}) => {

    return(
        <>
            <Form.Label><b>View user sessions record</b></Form.Label>
            <Form.Select aria-label="Default select example"
            onChange = { (e) => setSelectedUser(e.target.value)}
            className="formSelectMenu"
            >
                <option value= '0'>select User</option>
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
                <option value = {thisYear()}>{thisYear()}</option>
                <option value={lastYear()}>{lastYear()}</option>
            </Form.Select>
            <div className="flexRowCenter">                
                <Button className="customButtonBlue" type="submit"
                style = {{marginTop: "20px"}}
                >
                    {isLoading && <Spin />}
                    Submit
                </Button>
            </div> 
        </>
    )
}
export default UserSelector