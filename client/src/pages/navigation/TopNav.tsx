import { Link, useLocation } from "react-router-dom"
import './TopNav.scss'

// icons
import { GrOverview } from "react-icons/gr";
import { IoPersonSharp } from "react-icons/io5"
import { IoSettingsSharp } from "react-icons/io5"
import LogOut from "../auth/LogOut";
const TopNav = () => {
    const { pathname } = useLocation()
    return (

        <nav className="top_nav">

            <div>
                {
                    pathname === '/overview'
                        ?
                        null :
                        <Link to="/overview"><GrOverview /></Link>
                }
            </div>
            <div>
                <Link to="/settings/user-profile">
                    <IoPersonSharp />
                </Link>

            </div>
            <div>
                <Link to="/settings"><IoSettingsSharp /></Link>
            </div>

            <LogOut />
        </nav>
    )
}
export default TopNav