import { Link } from "react-router-dom"


const Overview = () => {
    return (
        <nav>
            <h1>Overview</h1>
            <Link to="/saved-courses">Saved Courses</Link>
            <Link to="/single-mode">Single Mode</Link>
            <Link to="/team-mode">Team Mode</Link>
        </nav>
    )
}
export default Overview