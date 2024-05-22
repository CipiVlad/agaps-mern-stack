import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../features/auth/authSlice';
import axios from 'axios';
import { useEffect } from 'react';

const LogOut = () => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3000/logout', {
                withCredentials: true,
            });
            dispatch(logOut({ user: null, accessToken: null }));

        } catch (error) {
            console.error('Failed to logout', error);
        }

        return (
            <div>
                <button onClick={() => handleLogout()}>Log Out</button>
            </div>
        )
    }

    return (
        <div>
            <button onClick={() => handleLogout()}>Log Out</button>
        </div>
    )
}

export default LogOut