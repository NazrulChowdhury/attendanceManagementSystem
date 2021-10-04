import Button from "react-bootstrap/Button"
import { useGlobalContext } from "../context/context"
import { useState } from "react"

const Login = (params) => {
    const loginHandler = () => window.open("http://localhost:8080/auth/google", "_self")
    
   // console.log(userState)
    return(
        <div className ="login_form_wrapper">
            <div className="container">
                <div>
                   Please Sign in..
                </div>
                <Button onClick = {loginHandler}>Log in with google</Button>
            </div>
        </div>
    )
}
export default Login
