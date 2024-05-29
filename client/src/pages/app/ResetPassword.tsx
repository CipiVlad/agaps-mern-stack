import { useNavigate } from "react-router-dom";
import GoBack from "../navigation/GoBack";



const ResetPassword = () => {
    const navigate = useNavigate()
    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(e.target.password.value);
        console.log(e.target.confirmPassword.value);
        try {
            if (e.target.password.value === e.target.confirmPassword.value) {
                console.log('Passwords match');
                navigate("/welcome-to-your-agaps")
            } else {
                console.log('Passwords do not match');
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password" aria-placeholder="Password">Password</label>
                <input type="password" name="password" id="password" />
                <label htmlFor="confirmPassword" aria-placeholder="Confirm Password">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" />
                <button type="submit">Submit</button>
            </form>

            <GoBack />
        </div>
    )
}
export default ResetPassword