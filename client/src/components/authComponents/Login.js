import Button from "react-bootstrap/Button"
import { FcGoogle } from "react-icons/fc"

const Login = (params) => {
    
    const loginHandler = () =>  window.open(`https://enigmatic-river-04425.herokuapp.com/auth/google`, "_self")    
   // const loginHandler = () =>  window.open(`http://localhost:5000/auth/google`, "_self")    
    return(
        <div className= "loginComponent">
            <Button className ="btn btn-light btn-lg" onClick = {loginHandler}> 
                <FcGoogle />  Login with Google
            </Button>
        </div>

    )
}
export default Login
