import {useContext, createContext, useReducer, useState, useEffect} from 'react'
import userReducer from './reducers/userReducer'
import GetUserStatus from './stateHooks/GetUserStatus'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalContextProvider = (props) => {

    const {isLoggedIn , setIsLoggedIn} = GetUserStatus('http://localhost:8080/auth/getUserStatus')

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
