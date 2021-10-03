import { useState, useEffect } from "react"
import axios from "axios" 

const GetAuthenticatedUser = (url) => {
    const [user, setUser] = useState()
    useEffect(() => {
        axios.get(url,{withCredentials : true})
        .then(response => response.data && setUser(response.data) )
    },[url])
    return {user}
}
export default GetAuthenticatedUser
