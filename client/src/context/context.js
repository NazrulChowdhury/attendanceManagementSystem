import {useContext, createContext, useState} from 'react'


const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalContextProvider = (props) => {

   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [timeSheetColumn, setTimeSheetColumn] = useState(false)
   const [formattedSessions, setFormattedSessions] = useState(false)
   const [refetchSessions, setRefetchSession] = useState(false)
   const [refetchHeatMap, setRefetchHeatmap] = useState(false)

    const value = { 
        isLoggedIn, setIsLoggedIn,
        timeSheetColumn, setTimeSheetColumn,
        formattedSessions, setFormattedSessions,
        refetchSessions, setRefetchSession,
        refetchHeatMap, setRefetchHeatmap
    }
    
    return(
        <GlobalContext.Provider value ={value}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider
