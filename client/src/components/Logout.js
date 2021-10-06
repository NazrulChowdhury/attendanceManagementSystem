import Button from "react-bootstrap/Button"
import { useGlobalContext } from "../context/context"

const Logout = ()=>{
    const {isLoggedIn, setIsLoggedIn} = useGlobalContext()
    const logOutHandler = () => {
        const response = 
    }
    return(
        <Button onClick = {}>
            Log Out
        </Button>
    )
}
export default Logout