const SignUp = () => {
    const handleSignUp = () => {
        console.log('signup')
    }
    return (
        <div>
            <h2>Sign Up</h2>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="text" name="username" placeholder="Username" />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}
export default SignUp