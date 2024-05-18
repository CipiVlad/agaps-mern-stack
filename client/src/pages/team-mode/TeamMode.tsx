import { Link } from "react-router-dom"


const TeamMode = () => {
    return (
        <nav>
            <Link to="/team-mode/two-vs-two">Two vs Two</Link>
            <Link to="/team-mode/single-scramble">Single Scramble</Link>
        </nav>

    )
}
export default TeamMode