import axios from "axios"
import Button from "react-bootstrap/Button"
import { server } from "../config/server"
import { useGlobalContext } from "../context/context"

const Logout = ()=>{
    const {isLoggedIn, setIsLoggedIn} = useGlobalContext()
    const logOutHandler = () => {
        axios.get(`${server.baseUrl}/auth/logout`)
        .then(response => setIsLoggedIn(response.data))
    }
    return(
        <Button onClick = {() => {logOutHandler()}}>
            Log Out
        </Button>
    )
}
export default Logout