import { useEffect } from 'react';
import Login from './components/Login';
import {useGlobalContext} from './context/context'
function App() {
  const {userState,userDispatch} = useGlobalContext()
  console.log(userState)
  
  return (
    <div >
      <Login />
    </div>
  );
}

export default App;
