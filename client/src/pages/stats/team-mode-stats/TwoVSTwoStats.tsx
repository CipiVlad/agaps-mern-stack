import { Link } from "react-router-dom"



const TwoVSTwoStats = () => {
    return (
        <div>
            <h1>Two-VS-Two Stats</h1>
            <div className="game_modes_container">
                <Link to="/stats/team-mode-stats/two-vs-two/match-play">Match Play</Link>
                <Link to="/stats/team-mode-stats/two-vs-two/stroke-play">Stroke Play</Link>
                <Link to="/stats/team-mode-stats/two-vs-two/combo-play">Combo Play</Link>
            </div>
        </div>
    )
}
export default TwoVSTwoStats