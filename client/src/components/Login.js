import Button from "react-bootstrap/Button"
import { useQuery } from "react-query"
import { useGlobalContext } from "../context/context"
import axios from 'axios'
import { useState } from "react"

const Login = (params) => {
    const {userState,userDispatch}= useGlobalContext()
    const [isLoading, setISloading] = useState()
    const [error, setError] = useState()
    const history = use
    const loginHandler = () => {
     // let windowObjectReference = 
      window.open('http://localhost:8080/auth/google')
      axios.get(

      ).
      
    }
    
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