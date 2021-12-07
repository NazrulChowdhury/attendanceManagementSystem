import { useHistory} from "react-router-dom"
import { ProSidebar, Menu, MenuItem, SubMenu, FaGem } from 'react-pro-sidebar'
import { AiFillDashboard, AiOutlineLogout } from "react-icons/ai"
import { BsCalendar3 } from "react-icons/bs"
import { MdAdminPanelSettings } from "react-icons/md"

const SideNavigation = () => { 
    const history = useHistory()
    return(
        <ProSidebar 
        iconShape="round"
        width = "200px"
        >
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
                <MenuItem 
                icon = {<MdAdminPanelSettings size={50} />}
                onClick = {() => history.push('/admin') }
                >
                    Admin
                </MenuItem> 
                <MenuItem 
                icon = {<AiOutlineLogout size={50} />}>
                    Logout
                </MenuItem>
            </Menu>
        </ProSidebar>
    )
}
export default SideNavigation 