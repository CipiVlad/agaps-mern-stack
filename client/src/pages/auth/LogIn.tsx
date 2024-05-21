import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCredentials } from "../../features/auth/authSlice"
import { useLoginMutation } from "../../features/auth/authApiSlice"



const LogIn = () => {
    const userRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLInputElement>(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()


    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const userData = await login({ username, password }).unwrap()
            console.log(userData);
            dispatch(setCredentials({ ...userData, username }))
            setUsername('')
            setPassword('')
            navigate('/welcome')

        } catch (err: any) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        }
    }

    return (
        <div>
            <h2>Log In</h2>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button onClick={handleSubmit}>Log In</button>
        </div>
    )
}
export default LogIn