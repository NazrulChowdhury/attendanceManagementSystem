import {useGlobalContext} from './context/context'
import 'antd/dist/antd.css' 
import './styles/app.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Login from './components/authComponents/Login'
import SideNavigation from './components/sharedComponents/SideNavigation'
import PageContainer from './components/sharedComponents/PageContainer'
import { useQuery } from 'react-query'
import { Spin } from 'antd'

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  const {isLoggedIn, setIsLoggedIn} = useGlobalContext(false)
  const [initialRender, setInitialRender] = useState(true)
  
  const getUserStatus = async() => {
    return await axios('/api/auth/getUserStatus',{withCredentials : true})
  }
  const {loading, refetch} = useQuery('getUserStatus', getUserStatus, {
    enabled : false,
    onSuccess : (data) => {
      setIsLoggedIn(data.data)
      setInitialRender(false)
    }
  })
  useEffect(() => refetch(),[])
  
  return ( 
    <div className = "appContainer">
      {isLoggedIn && 
        <>
          <div>
            <SideNavigation />
          </div>
          <div className ='pageContainer'> 
            <PageContainer />
          </div>  
        </>  
      }
      {!isLoggedIn && !initialRender && 
        <div className= "loginComponent">
          <Login />
        </div>
      }
      { initialRender || loading &&
        <div className="fullPageDiv flexRowCenter">
          <Spin size="large" />
        </div>
      }          
    </div>    
  )
}

export default App;
