import axios from "axios"
import Button from "react-bootstrap/Button"
import { useQuery } from "react-query"
import { useGlobalContext } from "../../context/context"

const Logout = ()=>{
    const {isLoggedIn, setIsLoggedIn} = useGlobalContext()
    const logOutHandler = async() => await axios(`/auth/logout`, {withCredentials : true})
    const {isLoding, error, data, refetch} = useQuery('logout', logOutHandler,{
        onSuccess : (data) => setIsLoggedIn(data.data),
        enabled : false
    })
    return(
        <Button onClick = {() => {refetch()}}>
            Log Out
        </Button>
    )
}
export default Logout