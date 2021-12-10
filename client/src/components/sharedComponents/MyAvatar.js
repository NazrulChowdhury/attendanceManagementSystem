import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const MyAvatar = () => {
    return(
        <div className="flexColumnCenter" style={{marginTop:'10px', marginBottom: '10px'}}>
            <div className="flexRowCenter">
                <Avatar 
                size={70} 
                icon={<UserOutlined />} 
                src = "https://lh3.googleusercontent.com/a-/AOh14GipFXEuTMMAe6VjzRsJuhd9O93VX9Y0w4gVCg2m=s96-c"
                />
            </div>
            <div>
                Welcome Nazrul
            </div>
        </div>
    )
}
export default MyAvatar