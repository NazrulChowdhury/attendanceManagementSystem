import { useEffect } from 'react';
import {useGlobalContext} from './context/context'
function App() {
  const {result, dispatch} = useGlobalContext()
useEffect(() => {
  dispatch({type : 'test'})
},[])
  console.log(result)
  
  return (
    <div >
      working!
    </div>
  );
}

export default App;
