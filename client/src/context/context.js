import {useContext, createContext, useReducer, useState, useEffect} from 'react'
import { server } from '../config/server'
import userReducer from './reducers/userReducer'
import GetUserStatus from './stateHooks/GetUserStatus'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalContextProvider = (props) => {

    const {isLoggedIn , setIsLoggedIn} = GetUserStatus(`${server.baseUrl}/auth/getUserStatus`)

    // all reducers... 
    const [userState,userDispatch] = useReducer(userReducer,{})

    const value = {
        userState, userDispatch,
        isLoggedIn, setIsLoggedIn
    }
    return(
        <GlobalContext.Provider value ={value}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider
