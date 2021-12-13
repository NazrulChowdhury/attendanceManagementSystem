import { useHistory} from "react-router-dom"
import { ProSidebar, Menu, MenuItem, SidebarHeader, SubMenu} from 'react-pro-sidebar'
import { AiFillDashboard, AiOutlineLogout } from "react-icons/ai"
import { BsCalendar3 } from "react-icons/bs"
import { MdAdminPanelSettings } from "react-icons/md"
import MyAvatar from "./MyAvatar"

const SideNavigation = () => { 
    const history = useHistory()
    return(
        <ProSidebar 
        iconshape="round"
        width = "200px"
        >
        <SidebarHeader> 
           <MyAvatar />
        </SidebarHeader>
            <Menu >
                <MenuItem 
                icon= {<AiFillDashboard size={50} />}
                onClick = {() => history.push('/') }
                > 
                   Dashboard
                </MenuItem> 
                <MenuItem 
                icon = {<BsCalendar3 size={30} />}
                onClick = {() => history.push('/records') }
                >
                    Records
                </MenuItem> 
                    <SubMenu title="Admin" icon={<MdAdminPanelSettings size={50} />}
                    >
                        <MenuItem
                        onClick = {() => history.push('/addUser') }
                        >  
                        Add User
                        </MenuItem>

                        <MenuItem
                        onClick = {() => history.push('/userRecords') }
                        >View user records
                        </MenuItem>
                        <MenuItem
                        onClick = {() => history.push('/manageUsers') }
                        >Manage users
                        </MenuItem>
                    </SubMenu>
                <MenuItem 
                icon = {<AiOutlineLogout size={50} />}
                onClick = {() => history.push('/logout')}
                >
                    Logout
                </MenuItem>
            </Menu>
        </ProSidebar>
    )
}
export default SideNavigation 