import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUser } from "./authSlice"
import { Link } from "react-router-dom"



const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    const welcome = user ? `Welcome ${user.username}` : "Welcome!"
    const TokenAbbr = `${token?.slice(0, 4)}...${token?.slice(-4)}`

    const content = (
        <section>
            <h1>{welcome}</h1>
            <p>Token: {TokenAbbr}</p>
            <Link to="/overview">Continue</Link>
        </section>
    )


    return (
        <main>
            {content}
        </main>
    )
}
export default Welcome