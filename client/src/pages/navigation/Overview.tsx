import { Link } from "react-router-dom"


const Overview = () => {
    return (
        <nav>

            <Link to="/single-mode">Single Mode</Link>
            <Link to="/team-mode">Team Mode</Link>
        </nav>
    )
}
export default Overview