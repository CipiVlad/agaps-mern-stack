import { Link } from "react-router-dom"
import GoBack from "./GoBack"
import TopNav from "./TopNav"


const Overview = () => {
    return (
        <nav>
            <TopNav />
            <h1>Overview</h1>
            <Link to="/saved-courses">Saved Courses</Link>
            <br />
            <Link to="/single-mode">Single Mode</Link>
            <br />
            <Link to="/team-mode">Team Mode</Link>
        </nav>
    )
}
export default Overview