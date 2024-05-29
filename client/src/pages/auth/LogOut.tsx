import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../features/auth/authSlice';
import axios from 'axios';
//icon logout
import { TbLogout } from "react-icons/tb";
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
            <TbLogout onClick={() => handleLogout()}>Log Out</TbLogout>
        </div>
    )
}

export default LogOut