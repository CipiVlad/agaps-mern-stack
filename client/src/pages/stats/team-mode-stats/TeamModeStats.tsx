import { Link } from "react-router-dom"


const TeamModeStats = () => {
    return (
        <div>
            <h1>TeamModeStats</h1>
            <div className="game_modes_container">
                <Link to="/stats/team-mode-stats/two-vs-two">Two-VS-Two</Link>
                <Link to="/stats/team-mode-stats/single-scramble">Single Scramble</Link>
            </div>
        </div>
    )
}
export default TeamModeStats