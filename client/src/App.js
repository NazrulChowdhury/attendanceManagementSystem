
import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import {useGlobalContext} from './context/context'


function App() {
  const {isLoggedIn} = useGlobalContext()
  return (
    <div>
      <Nav />
    </div>
  )
}

export default App;
