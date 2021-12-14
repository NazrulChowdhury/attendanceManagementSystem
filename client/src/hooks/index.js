import axios from "axios"
import { useState } from "react"

export const useDeleteSession = async() => {
    const [deleteSession, setDeleteSession] = useState(false)
        setDeleteSession( async(id) => {
            return await axios({
                method : 'delete',
                withCredentials : true,
                url : '/session/deleteSession',
                data : {id}
            })
        } )
    return {deleteSession}
       
}
export const getUsers = async() => {
    return await axios('/admin/getUsers',{withCredentials : true}) 
}
