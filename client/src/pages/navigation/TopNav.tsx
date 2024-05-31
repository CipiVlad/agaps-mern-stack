import { Link, useLocation } from "react-router-dom"
import './TopNav.scss'

// icons
import { GrOverview } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5"
import { IoAdd } from "react-icons/io5"


import LogOut from "../auth/LogOut";
const TopNav = () => {
    const { pathname } = useLocation()
    return (

        <nav className="top_nav">

            <div>
                {pathname === '/overview' ? null : <Link to="/overview"><GrOverview /></Link>}
            </div>
            <div>
                {pathname === '/welcome-to-your-agaps' ? null : <Link to="/welcome-to-your-agaps"><IoAdd /></Link>}
            </div>

            <div>
                {pathname === '/settings' ? null : <Link to="/settings"><IoSettingsSharp /></Link>}
            </div>

            <LogOut />
        </nav>
    )
}
export default TopNav