import {useContext, createContext, useReducer, useState, useEffect} from 'react'
import userReducer from './reducers/userReducer'
import { userObject } from './initialStates/userObject'
import axios from 'axios'
import GetAuthenticatedUser from './stateHooks/getAuthenticatedUSer'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalContextProvider = (props) => {

    const {user} = GetAuthenticatedUser('http://localhost:8080/auth/getUser')

    // all reducers... 
    const [userState,userDispatch] = useReducer(userReducer,userObject)

    const value = {
        userState,userDispatch,
        user
    }
    return(
        <GlobalContext.Provider value ={value}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider
