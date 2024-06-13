import { useSavePeerMutation } from "../../features/auth/authApiSlice"
import GoBack from "../navigation/GoBack"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const AddPeer = () => {
    const navigate = useNavigate()
    const [peer, setPeer] = useState('')
    const [savePeer, { isLoading }] = useSavePeerMutation()
    if (isLoading) return <div>Loading...</div>

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const response = await savePeer({ peerName: peer }).unwrap()
        console.log(response);
        setPeer('')

        navigate('/peers')
    }
    return (
        <div>
            <h1>Add Peer</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="peer">Peer Name:</label>
                <input type="text" value={peer} onChange={(e) => setPeer(e.target.value)} name="peer" id="peer" />
                <button type="submit">Submit</button>
            </form>
            <GoBack />
        </div>
    )
}
export default AddPeer