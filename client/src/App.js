
import Nav from './components/sharedComponents/Nav'
import {useGlobalContext} from './context/context'
import 'antd/dist/antd.css'; 


function App() {
  const {isLoggedIn} = useGlobalContext()
  return (
    <div>
      <Nav />
    </div>
  )
}

export default App;
