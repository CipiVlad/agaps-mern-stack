import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUser } from "./authSlice"
import { Link } from "react-router-dom"

//icon for stats
import { IoStatsChart } from "react-icons/io5"

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


    const welcome = user ? `Welcome ${user.username}` : "Welcome!"

    const content = (
        <section>
            <h1>{welcome}</h1>
            <br />
            <Link to="/stats/all-stats"><IoStatsChart />View All Your Stats</Link>
            <br />
            <div>
                <p>Choose A Game Mode</p>
                <Link to="/choose-game-mode">Choose Game Mode</Link>
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