
import Nav from './components/sharedComponents/Nav'
import {useGlobalContext} from './context/context'
import 'antd/dist/antd.css'; 
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  const {isLoggedIn} = useGlobalContext()
  return (
    <div>
      <Nav />
    </div>
  )
}

export default App;
