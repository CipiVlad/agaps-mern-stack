import { useSelector } from "react-redux"
import { useSaveTeamMutation } from "../../features/auth/authApiSlice"
import { RootState } from "../../app/store"
import GoBack from "../navigation/GoBack"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const AddTeam = () => {
    const navigate = useNavigate()
    const [team, setTeam] = useState('')
    const [saveTeam, { isLoading }] = useSaveTeamMutation()
    if (isLoading) return <div>Loading...</div>

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const response = await saveTeam({ teamName: team }).unwrap()
        console.log(response);
        setTeam('')

        navigate('/peers')
    }
    return (
        <div>
            <h1>Add Team</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="peer">Peer Name:</label>
                <input type="text" value={team} onChange={(e) => setTeam(e.target.value)} name="peer" id="peer" />
                <button type="submit">Submit</button>
            </form>
            <GoBack />
        </div>
    )
}
export default AddTeam