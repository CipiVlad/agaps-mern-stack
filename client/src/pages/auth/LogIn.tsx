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
            navigate('/welcome-to-your-agaps')
            console.log(userData);

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
            errRef.current?.focus()
        }
    }

    const handleUserInput = (e: any) => setUsername(e.target.value)
    const handlePwdInput = (e: any) => setPassword(e.target.value)

    const content = isLoading ? <p>Loading...</p> : (
        <section>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={handleUserInput}
                    value={username}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={password}
                    required
                />
                <button>Log In</button>
            </form>
        </section>


    )
    return (
        <div>
            {content}
        </div>

    )
}
export default LogIn