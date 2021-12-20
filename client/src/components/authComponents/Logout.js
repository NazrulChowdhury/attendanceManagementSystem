import axios from "axios"
import { useQuery } from "react-query"
import { useGlobalContext } from "../../context/context"
import { Spin, Space } from 'antd'

const Logout = ()=>{
    const {setIsLoggedIn} = useGlobalContext()
    const logOutHandler = async() => await axios(`api/auth/logout`, {withCredentials : true})
    const {isLoding} = useQuery('logout', logOutHandler,{
        onSuccess : (data) => setIsLoggedIn(data.data)
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