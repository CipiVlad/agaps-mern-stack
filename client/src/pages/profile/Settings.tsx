import { Link } from "react-router-dom"
import { IoPersonSharp } from "react-icons/io5"
import GoBack from "../navigation/GoBack"
import TopNav from "../navigation/TopNav"


const Settings = () => {
    return (
        <div>
            <TopNav />
            <h1>Settings</h1>
            <Link to="/settings/user-profile"><IoPersonSharp /> Profile</Link>
            <GoBack />
        </div>
    )
}
export default Settings