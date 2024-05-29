import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUser } from "./authSlice"
import { Link } from "react-router-dom"

// game mode icon 
import { IoGameControllerSharp } from "react-icons/io5"

//scss
import "./Welcome.scss"


import TopNav from "../../pages/navigation/TopNav"
import { jwtDecode } from "jwt-decode"
import { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
    username: string;
}

const Welcome = () => {
    const token = useSelector(selectCurrentToken)
    const user = jwtDecode<CustomJwtPayload>(token);
    console.log(user);




    const content = (
        <section className="game_modes_container">
            <h2>Welcome  <span>{user && user.username}</span></h2>
            <h2></h2>
            <br />
            <div>
                <Link to="/choose-game-mode"><IoGameControllerSharp /> Choose Game Mode</Link>
            </div>
        </section>
    )


    return (
        <main>
            <TopNav />
            {content}
        </main>
    )
}
export default Welcome