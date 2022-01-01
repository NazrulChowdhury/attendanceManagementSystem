import Button from "react-bootstrap/Button"
import { FcGoogle } from "react-icons/fc"

const Login = (params) => {
    
    const loginHandler = () =>  window.open(`/auth/google`, "_self")    
    return(
        <div className= "loginComponent">
            <Button className ="btn btn-light btn-lg" onClick = {loginHandler}> 
                <FcGoogle />  Login with Google
            </Button>
        </div>

    )
}
export default Login
