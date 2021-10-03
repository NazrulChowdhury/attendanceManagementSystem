import Login from './components/Login';
import {useGlobalContext} from './context/context'

function App() {
  const {user} = useGlobalContext()
  console.log('user', user)
  return (
    <div>
      <div >
        {!user && <Login />}
      </div>
      <div>
      </div>
    </div>

  );
}

export default App;
