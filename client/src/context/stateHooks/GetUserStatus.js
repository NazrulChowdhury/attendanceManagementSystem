import { useState, useEffect } from "react"
import axios from "axios" 

const GetUserStatus = (url) => {
    const [isLoggedIn, setIsLoggedIn] = useState()
    useEffect(() => {
        axios.get(url,{withCredentials : true})
        .then(response => { console.log('getUserStatus response', response)
            response.data && setIsLoggedIn(response.data) }
            )
        .catch(error => {})
    })
    return {isLoggedIn ,setIsLoggedIn}
}
export default GetUserStatus
