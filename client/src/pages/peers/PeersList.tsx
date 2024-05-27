import { useSelector } from "react-redux"
import { useGetPeersQuery } from "../../features/auth/authApiSlice"
import { RootState } from "../../app/store"
import GoBack from "../navigation/GoBack"
import { Link } from "react-router-dom"
//add icon
import { IoAdd } from "react-icons/io5"
import { useEffect } from "react"
const PeersList = () => {
    const token = useSelector((state: RootState) => state.auth.token)
    const { data: data, isLoading } = useGetPeersQuery(token)

    if (isLoading) return <div>Loading...</div>

    const peerNames = data.peerName

    const teamNames = data.teamName


    return (
        <div>
            <h1>Peers</h1>
            <h3>List of Peers</h3>
            <ul>
                {peerNames && peerNames.map((each: any, index: number) => {
                    return (
                        <li key={index}>{each}</li>
                    )
                })}
            </ul>
            <Link to="/peers/add-peer"><IoAdd /> Add Peer</Link>
            <h3>List of Teams</h3>
            <ul>
                {teamNames && teamNames.map((each: any, index: number) => {
                    return (
                        <li key={index}>{each}</li>
                    )
                })}
            </ul>
            <Link to="/peers/add-team"><IoAdd /> Add Team</Link>
            <GoBack />
        </div>
    )
}
export default PeersList