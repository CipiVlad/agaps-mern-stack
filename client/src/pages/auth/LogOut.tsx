import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../features/auth/authSlice';
import axios from 'axios';
//icon logout
import { IoLogOutSharp } from "react-icons/io5"
const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3000/logout', {
                withCredentials: true,
            });
            dispatch(logOut({ user: null, accessToken: null }));
            navigate('/logout');
        } catch (error) {
            console.error('Failed to logout', error);
        }
    }

    return (
        <div>
            <IoLogOutSharp onClick={() => handleLogout()}>Log Out</IoLogOutSharp>
        </div>
    )
}

export default LogOut