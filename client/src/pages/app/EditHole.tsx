import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import './EditHole.css'

const EditHole = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [getDetails, setGetDetails] = useState<any>([])
    const [getHoleId, setGetHoleId] = useState<number>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:3000/single-agap/${id}`)
            // const response = await axios.get(`https://agaps-a-golf-analyze-web-app.onrender.com/single-agap/${id}`)
            setGetDetails(response.data)
            setGetHoleId(response.data[0].id)
            console.log(response.data[0].id);

        }
        fetchData()
    }, [id])

    const [inputState, setInputState] = useState<any>([])

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setInputState((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }

    const updateHole = async (e: any) => {
        e.preventDefault()

        const newPostObj = {
            id: getHoleId,
            hole: getDetails.map((data: any) => data.hole),
            par: getDetails.map((data: any) => data.par),
            roundId: getDetails.map((data: any) => data.roundId),
            score: inputState.score || getDetails.map((data: any) => data.score),
            fairway: inputState.fairway || getDetails.map((data: any) => data.fairway),
            green: inputState.green || getDetails.map((data: any) => data.green),
            approach: inputState.approach || getDetails.map((data: any) => data.approach),
            penalty: inputState.penalty || getDetails.map((data: any) => data.penalty),
            putts: inputState.putts || getDetails.map((data: any) => data.putts)
        }

        // console.log(newPostObj)

        try {
            const response = await axios.put(`http://localhost:3000/agaps/${getHoleId}`, newPostObj)
            // const response = await axios.put(`https://agaps-a-golf-analyze-web-app.onrender.com/agaps/${id}`, newPostObj)
            console.log(response.data);
            setGetDetails((prev: any) => [...prev, response.data])

            navigate(-1)

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <>
            {
                getDetails &&

                getDetails.map((data: any, index: number) => {
                    return (
                        <div key={index} className="editCard">
                            <h2>Edit - Hole {data.hole}</h2>
                            <form>
                                <div>
                                    <label htmlFor="score">Score</label>
                                    <p>{data.score}</p>
                                    <input type="text" name="score" value={inputState.score} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="fairway">Fairway</label>
                                    <p>{data.fairway}</p>
                                    <input type="text" name="fairway" value={inputState.fairway} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="green">Green</label>
                                    <p>{data.green}</p>
                                    <input type="text" name="green" value={inputState.green} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="approach">Approach</label>
                                    <p>{data.approach}</p>
                                    <input type="text" name="approach" value={inputState.approach} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="penalty">Penalty</label>
                                    <p>{data.penalty}</p>
                                    <input type="text" name="penalty" value={inputState.penalty} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="putts">Putts</label>
                                    <p>{data.putts}</p>
                                    <input type="text" name="putts" value={inputState.putts} onChange={handleInputChange} />
                                </div>
                            </form>
                            <button onClick={updateHole}>Update</button>
                            <p onClick={() => navigate(-1)}>back</p>

                        </div>
                    )
                })
            }

        </>
    )
}
export default EditHole