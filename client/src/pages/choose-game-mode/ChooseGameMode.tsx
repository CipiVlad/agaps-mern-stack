import { Link } from "react-router-dom"

const ChooseGameMode = () => {
    return (
        <div className="game_modes_container">
            <Link to="/single-mode">Single Mode</Link>
            <Link to="/team-mode">Team Mode</Link>
        </div>
    )
}
export default ChooseGameMode