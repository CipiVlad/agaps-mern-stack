import { Link, useNavigate, useLocation } from "react-router-dom"
import { RiHome4Line } from "react-icons/ri";
import { GrOverview } from "react-icons/gr";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoMdStats } from "react-icons/io";
import './Navbar.css'

const Navbar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()


    return (
        <nav className="nav_container">
            {/* don't display nav_container if pathname is '/add-round' */}
            {
                pathname == '/add-round' || pathname.includes('hole-card') ? null : <button onClick={() => navigate('/add-round')}><IoAddCircleOutline /></button>

            }


            <button onClick={() => navigate('/overview')}><GrOverview /></button>
            {
                pathname === '/' ? <button style={{ display: 'none' }}><RiHome4Line /></button>
                    : <button onClick={() => navigate('/')}><RiHome4Line /></button>
            }
            <button onClick={() => navigate('/stats')}><IoMdStats /></button>
        </nav >
    )
}
export default Navbar