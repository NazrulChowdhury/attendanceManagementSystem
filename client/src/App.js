
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import {useGlobalContext} from './context/context'

function App() {
  const {isLoggedIn} = useGlobalContext()
  if(!isLoggedIn) return <Login />

  return (
    <div>
      {isLoggedIn && <Logout />}
      <Home />
    </div>
  )
}

export default App;
