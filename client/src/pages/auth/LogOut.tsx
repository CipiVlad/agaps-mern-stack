import { useState } from "react"
import { logOut } from "../../features/auth/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const LogOut = () => {
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState('')

    const dispatch = useDispatch()

    const handleLogOut = (e: any) => {
        e.preventDefault()
        try {
            const userData = dispatch(logOut({ user: null, accessToken: null }))
            console.log(userData);
            navigate('/login')
        } catch (err: any) {
            if (!err.status) {
                setErrMsg('No Server Response')
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg(err.data?.message)
            }
        }
    }


    return (
        <div>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}
export default LogOut