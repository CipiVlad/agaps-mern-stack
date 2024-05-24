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
            <div>
                <Link to="/stats/all-stats"><IoStatsChart />View All Your Stats</Link>
            </div>
            <br />
            <div>
                <Link to="/choose-game-mode">Choose Game Mode</Link>
            </div>
            <br />
            <div>
                <Link to="/peers">View Peers</Link>
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