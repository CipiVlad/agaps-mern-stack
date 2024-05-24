import { Link } from "react-router-dom"
import './WelcomeScreen.scss'




const WelcomeScreen = () => {
    return (
        <div>
            <h1>AGAPS</h1>
            <p>Track Your Golf (R)evolution</p>

            <div className="welcome_screen_links">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
            </div>

        </div>
    )
}
export default WelcomeScreen