import {useContext, createContext, useReducer} from 'react'
import userReducer from './reducers/userReducer'
import { userObject } from './initialStates/userObject'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalContextProvider = (props) => {
    // all reducers... 
    const [userState,userDispatch] = useReducer(userReducer,userObject)

    const value = {
        userState,userDispatch
    }
    return(
        <GlobalContext.Provider value ={value}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider
