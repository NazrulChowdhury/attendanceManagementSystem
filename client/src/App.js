import {useGlobalContext} from './context/context'
import 'antd/dist/antd.css' 
import './styles/app.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Login from './components/authComponents/Login'
import SideNavigation from './components/sharedComponents/SideNavigation'
import PageContainer from './components/sharedComponents/PageContainer'

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  const {isLoggedIn, setIsLoggedIn} = useGlobalContext()
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    axios.get('/api/auth/getUserStatus',{withCredentials : true})
    .then(response =>  setIsLoggedIn(response.data))
    .catch(err => setBroken(true))
  },[])
  
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
        </>  }
        {!isLoggedIn && 
        <div className= "loginComponent">
          <Login />
        </div>}          
         {/* {broken component goes here} */}
     </div>    
  )
}

export default App;
