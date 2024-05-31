import { Link } from "react-router-dom"
import GoBack from "./GoBack"
import TopNav from "./TopNav"
//icon peers
import { IoPeopleSharp } from "react-icons/io5"
//icon for stats
import { IoStatsChart } from "react-icons/io5"
//icon for courses
import { GiGolfFlag } from "react-icons/gi";


const Overview = () => {
    return (
        <nav>
            <TopNav />
            <h1>Overview</h1>
            <div>
                <Link to="/saved-courses"><GiGolfFlag></GiGolfFlag>Saved Courses</Link>
            </div>
            <br />
            <div>
                <Link to="/stats/all-stats"><IoStatsChart /> View All Your Stats</Link>
            </div>
            <br />
            <div>
                <Link to="/peers"> <IoPeopleSharp /> View Peers</Link>
            </div>
            <br />
            <GoBack />
        </nav>
    )
}
export default Overview