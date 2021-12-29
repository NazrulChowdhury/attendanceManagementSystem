import { Avatar, message, Spin } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

const Profile = () => {
    const [profile, setProfile] = useState(false)
    const getProfileInfo = async() => axios('api/user/profile', {withCredentials : true})
    const {refetch: fetchProfile} = useQuery('getProfile', getProfileInfo, {
        enabled : false ,
        onSuccess: (data) => setProfile(data.data),
        onError: (error) => message.error(`ERROR!!! ${error.response.data}`)
    })
    useEffect(() => fetchProfile(),[])

    return(
        <div className="flexColumnCenter" style={{marginTop:'10px', marginBottom: '10px'}}>
            {profile && 
                <>
                    <div className="flexRowCenter">
                        <Avatar 
                        size={70} 
                        icon={<UserOutlined />} 
                        src = {profile.image}
                        />
                    </div>
                    <div>
                        Welcome {profile.name}
                    </div>
                </>
            }
            {!profile && 
                <div className="flexRowCenter">
                    <Spin />
                </div>
            }
        </div>
    )
}
export default Profile