import { useSelector } from "react-redux"
import { useGetPeersQuery } from "../../features/auth/authApiSlice"
import { RootState } from "../../app/store"
import GoBack from "../navigation/GoBack"

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
            <h3>List of Teams</h3>
            <ul>
                {teamNames && teamNames.map((each: any, index: number) => {
                    return (
                        <li key={index}>{each}</li>
                    )
                })}
            </ul>
            <GoBack />
        </div>
    )
}
export default PeersList