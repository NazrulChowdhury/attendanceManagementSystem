
import Nav from './components/sharedComponents/Nav'
import {useGlobalContext} from './context/context'
import 'antd/dist/antd.css'; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import Login from './components/authComponents/Login';

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  const {isLoggedIn, setIsLoggedIn} = useGlobalContext()
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    axios.get('/auth/getUserStatus',{withCredentials : true})
    .then(response =>  setIsLoggedIn(response.data))
    .catch(err => setBroken(true))
  },[])

  return (
      <div>
         {isLoggedIn && <Nav /> }
         {!isLoggedIn && <Login />}
         {/* {broken component goes here} */}
     </div>    
  )
}

export default App;
