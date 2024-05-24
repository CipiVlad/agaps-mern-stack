import { Link } from "react-router-dom"


const AllStats = () => {
    return (
        <div>
            <h1>All Team Mode Stats</h1>
            <Link to="/stats/team-mode-stats">Team Mode Stats</Link>
            <Link to="/stats/single-mode-stats">Single Mode Stats</Link>
        </div>
    )
}
export default AllStats