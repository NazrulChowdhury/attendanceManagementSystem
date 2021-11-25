import Button from "react-bootstrap/Button"
import { Switch, Route} from "react-router-dom";
import Home from "../pageComponents/home/Home";
import Login from "../authComponents/Login";
import { useHistory } from "react-router-dom";
import Logout from "../authComponents/Logout";
import AddUser from "../userComponents/AddUser";
import AuthFailure from "../authComponents/AuthFailure";
import Calendar from "../pageComponents/records/Calendar";
import { useGlobalContext } from "../../context/context";

const Nav = () => {
    const history = useHistory()
    const {isLoggedIn, setIsLoggedIn} = useGlobalContext()
    return(
        <div>
            <Button onClick = {() => history.push('/')}> Home </Button>
            <Button onClick = {() => history.push('/records')}> Records </Button>
            <Button onClick = {() => history.push('/addUser')}> Add User </Button>
            {!isLoggedIn && <Button onClick = {() => history.push('/login')}> Login </Button>}
            {isLoggedIn && <Logout />}
            <Switch>
                <Route exact path ="/" component = {Home} />
                <Route exact path ="/records" component = {Calendar} />
                <Route path = '/login' component = {Login} />
                <Route path = '/addUser' component = {AddUser} />
                <Route path = '/authFailure' component = {AuthFailure} />
                <Route path = '/broken'  />
            </Switch>
        </div>
    )
}
export default Nav