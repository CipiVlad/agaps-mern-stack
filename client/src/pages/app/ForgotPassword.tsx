import { useNavigate } from "react-router-dom";
import GoBack from "../navigation/GoBack";



const ForgotPassword = () => {
    const navigate = useNavigate()
    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(e.target.email.value);
        navigate("/reset-password", { state: e.target.email.value })
    }
    return (
        <div>
            <h1>Forgot Password?</h1>
            <article>
                <p>Enter your email address and we will send you a link to reset your password</p>
            </article>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <button type="submit">Submit</button>
            </form>

            <GoBack />

        </div>
    )
}
export default ForgotPassword