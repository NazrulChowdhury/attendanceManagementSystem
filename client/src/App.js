import Home from './components/Home'
import Login from './components/Login'
import {useGlobalContext} from './context/context'

function App() {
  const {user} = useGlobalContext()

  return (
    <div>
      {!user && <Login />}
      {user && <Home />}

    </div>
  )
}

export default App;
