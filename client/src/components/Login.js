import Button from "react-bootstrap/Button"
import { useQuery } from "react-query"
import { useGlobalContext } from "../context/context"
import axios from 'axios'

const Login = (params) => {
    const {userState,userDispatch}= useGlobalContext()
    const loginHandler = async() => await axios("http://localhost:8080/auth/google") 
    const {isLoading, error} = useQuery('users', loginHandler,{
        onSuccess : (data) => userDispatch({type : 'SUCCESS', payload : data.data})
    })
    console.log(userState)
    return(
        <div className ="login_form_wrapper">
            <div className="container">
                <div>
                    Welcome! Please Sign in..
                </div>
                <Button onClick = {loginHandler}>Log in with google</Button>
            </div>
        </div>
    )
}
export default Login