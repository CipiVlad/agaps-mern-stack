import { Link } from "react-router-dom"





const WelcomeScreen = () => {
    return (
        <div>
            <h1>AGAPS</h1>
            <p>Track Your Golf (R)evolution</p>

            <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
            </>

        </div>
    )
}
export default WelcomeScreen