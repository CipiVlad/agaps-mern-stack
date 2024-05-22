import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setCredentials } from "../../features/auth/authSlice"
import { useSignupMutation } from "../../features/auth/authApiSlice"
import { IoChevronBack } from "react-icons/io5"


const SignUp = () => {

    const userRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLInputElement>(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [signup, { isLoading }] = useSignupMutation()
    const dispatch = useDispatch()


    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password, email])


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const userData = await signup({ username, password, email }).unwrap()
            console.log(userData);
            dispatch(setCredentials({ ...userData, username }))
            setEmail('')
            setUsername('')
            setPassword('')
            navigate('/welcome-to-your-agaps')
            console.log(userData);

        }

        catch (err: any) {
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

    const handleEmailInput = (e: any) => setEmail(e.target.value)
    const handleUserInput = (e: any) => setUsername(e.target.value)
    const handlePwdInput = (e: any) => setPassword(e.target.value)

    const content = isLoading ? <div>Loading...</div> : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Sign Up</h1>
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

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    onChange={handleEmailInput}
                    value={email}
                    required
                />

                <button>Sign Up</button>
            </form>
        </section>
    )

    return (
        <div>
            {content}
            <Link to="/"><IoChevronBack /></Link>
        </div>
    )

}

export default SignUp