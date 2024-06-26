import { Link } from "react-router-dom"
import GoBack from "../navigation/GoBack"


const AllStats = () => {
    return (
        <div>
            <h1>All Your Stats</h1>
            <div className="game_modes_container">
                <Link to="/stats/single-mode-stats">Single Mode Stats</Link>
                <Link to="/stats/team-mode-stats">Team Mode Stats</Link>
                <GoBack />
            </div>
        </div>
    )
}
export default AllStats