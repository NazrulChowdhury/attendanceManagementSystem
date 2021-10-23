import Button from "react-bootstrap/Button"
import { Switch, Route} from "react-router-dom";
import Home from "../pageComponents/Home";
import Login from "../authComponents/Login";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import Logout from "../authComponents/Logout";
import AddUser from "../userComponents/AddUser";
import AuthFailure from "../authComponents/AuthFailure";

const Nav = () => {
    const history = useHistory()
    const {isLoggedIn} = useGlobalContext()
    return(
        <div>
            <Button onClick = {() => history.push('/')}> Home </Button>
            <Button onClick = {() => history.push('/addUser')}> Add User </Button>
            {!isLoggedIn && <Button onClick = {() => history.push('/login')}> Login </Button>}
            {isLoggedIn && <Logout />}
            <Switch>
                <Route exact path ="/">  <Home /> </Route>
                <Route path = '/login'> <Login /> </Route>
                <Route path = '/addUser'> <AddUser /> </Route>
                <Route path = '/authFailure'> <AuthFailure /> </Route>
            </Switch>
        </div>
    )
}
export default Nav