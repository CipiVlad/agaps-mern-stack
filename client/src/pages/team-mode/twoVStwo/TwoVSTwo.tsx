import { Link } from "react-router-dom"


const TwoVSTwo = () => {
    return (
        <div>
            <h1>Two-VS-Two</h1>
            <div className="game_modes_container">
                <Link to="/team-mode/two-vs-two/match-play">Match Play</Link>
                <Link to="/team-mode/two-vs-two/stroke-play">Stroke Play</Link>
                <Link to="/team-mode/two-vs-two/combo-play">Combo Play</Link>
            </div>

        </div>
    )
}
export default TwoVSTwo