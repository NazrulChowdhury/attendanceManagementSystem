import Calendar from "../pageComponents/records/Calendar"
import { Switch, Route} from "react-router-dom"
import AuthFailure from "../authComponents/AuthFailure"
import Login from "../authComponents/Login"
import AddUser from "../adminComponents/AddUser"
import Home from "../pageComponents/home/Home"
import Logout from "../authComponents/Logout"
import UserList from '../adminComponents/UserList'
import UsersSessionRecord from "../adminComponents/UsersSessionRecord"
import NotFound from "../authComponents/NotFound"

const PageContainer = () => {
    return(
        <>
            <Switch> 
                <Route exact path = '/' component = {Home} />
                <Route exact path = '/records' component = {Calendar} />
                <Route exact path = '/admin' />
                <Route exact path = '/login' component = {Login} />
                <Route exact path = '/logout' component = {Logout} />
                <Route exact path = '/addUser' component = {AddUser} />
                <Route exact path = '/userRecords' component={UsersSessionRecord} />
                <Route exact path = '/manageUsers' component={UserList} /> 
                <Route exact path = '/authFailure' component = {AuthFailure} />
                <Route component={NotFound}/>
            </Switch> 
        </>
    )
}
export default PageContainer