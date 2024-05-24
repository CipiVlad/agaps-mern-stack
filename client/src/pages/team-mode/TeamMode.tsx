import { Link } from "react-router-dom"
import "./TeamMode.scss"

const TeamMode = () => {
    return (
        <nav className="game_modes_container">
            <Link to="/team-mode/two-vs-two">Two vs Two</Link>

            <Link to="/team-mode/single-scramble">Single Scramble</Link>
        </nav>

    )
}
export default TeamMode