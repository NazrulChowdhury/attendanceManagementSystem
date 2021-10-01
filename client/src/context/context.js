import {useContext, createContext, useReducer} from 'react'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalContextProvider = (props) => {
    const myReducer = (state,action) => {
        switch (action.type) {
            case 'test':
                return {result : 'working'}               
                break;
        
            default:
                break;
        }
    }
    // all reducers... 
    const [result, dispatch] = useReducer(myReducer,{})

    const value = {
        result, dispatch
    }
    return(
        <GlobalContext.Provider value ={value}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider
