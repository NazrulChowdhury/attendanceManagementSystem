import axios from "axios"
import { useQuery } from "react-query"
import { useGlobalContext } from "../../context/context"
import { Spin, Space, message } from 'antd'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const Logout = ()=>{

    const {status, setStatus} = useGlobalContext()
    const history = useHistory()
    const logOutHandler = async() => await axios(`api/auth/logout`, {withCredentials : true})
    const {isLoding} = useQuery('logout', logOutHandler,{ 
        onSuccess : (data) => { 
            setStatus({...status, isLoggedIn : data.data})
            history.push('/')
        },
        onError : (error) => message.error(error)
    })

    return(
         
            <div className = "logoutDiv">
                {isLoding && 
                <Space size="large">
                    <Spin size="large" />
                </Space>  }
            </div>
        
    )
}
export default Logout