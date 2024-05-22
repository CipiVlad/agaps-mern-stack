import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUser } from "./authSlice"
import { Link } from "react-router-dom"
import LogOut from "../../pages/auth/LogOut"



const Welcome = () => {
    const user = useSelector(selectCurrentUser)


    const welcome = user ? `Welcome ${user.username}` : "Welcome!"

    const content = (
        <section>
            <h1>{welcome}</h1>
            <Link to="/overview">Continue</Link>
        </section>
    )


    return (
        <main>
            <LogOut />
            {content}
        </main>
    )
}
export default Welcome