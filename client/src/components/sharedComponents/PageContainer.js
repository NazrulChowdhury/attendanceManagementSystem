import Calendar from "../pageComponents/records/Calendar"
import { Switch, Route} from "react-router-dom"
import AuthFailure from "../authComponents/AuthFailure"
import Login from "../authComponents/Login"
import AddUser from "../userComponents/AddUser"
import Home from "../pageComponents/home/Home"

const PageContainer = () => {
    return(
        <>
            <Switch> 
                <Route exact path = '/' component = {Home} />
                <Route exact path = '/records' component = {Calendar} />
                <Route exact path = '/admin' />
                <Route exact path = '/login' component = {Login} />
                <Route exact path = '/addUser' component = {AddUser} />
                <Route exact path = '/authFailure' component = {AuthFailure} />
                <Route exact path = '/broken'  />
            </Switch>
        </>
    )
}
export default PageContainer