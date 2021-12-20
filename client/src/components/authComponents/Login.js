import Button from "react-bootstrap/Button"
import { FcGoogle } from "react-icons/fc"
import axios from "axios"

const Login = (params) => {
    
    const loginHandler = () =>  window.open(`${axios.defaults.baseURL}/auth/google`, "_self")    
    return(
        <Button className ="btn btn-light btn-lg" onClick = {loginHandler}> 
            <FcGoogle />  Login with Google
        </Button>

    )
}
export default Login
