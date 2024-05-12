import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate, useLocation, useParams } from "react-router-dom"
import './HoleDetail.css'

const HoleDetail = () => {
    // here you fetch the hole detail overview
    // by the courseId matching the roundId (courseInfo server)
    const { id } = useParams()
    // const { state } = useLocation() //formattedTimes
    const [getDetails, setGetDetails] = useState<any>([])

    //explanation see below
    const state = useLocation().state || getDetails[0]?.roundId || ''

    // fetch data by id
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:3000/agaps/${id}`)
            // const response = await axios.get(`https://agaps-a-golf-analyze-web-app.onrender.com/agaps/${id}`)
            setGetDetails(response.data)
            // setGetHoleId(response.data[0].id)
        }
        fetchData()
    }, [])

    // console.log(getHoleId);

    return (
        <>
            {
                getDetails.length < 18
                    ?
                    <>
                        <p>Didn't finish your round?</p>
                        <Link to={`/hole-card/${getDetails.length + 1}`} state={state}>Continue with Hole {getDetails.length + 1}</Link>
                    </>
                    : null
            }


            <div>
                <h2>Hole Detail</h2>
                {/* <p>{state.slice(0, 10)}</p> */}
            </div>
            {
                getDetails.map((data: any, index: number) => {
                    return (
                        <div key={index} className="detailCard">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Hole</th>
                                        <th>Par</th>
                                        <th>Score</th>
                                        <th>Fairway</th>
                                        <th>Green</th>
                                        <th>Approach</th>
                                        <th>Penalty</th>
                                        <th>Putts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{data.hole}</td>
                                        <td>{data.par}</td>
                                        <td>{data.score}</td>
                                        <td>{data.fairway}</td>
                                        <td>{data.green}</td>
                                        <td>{data.approach}</td>
                                        <td>{data.penalty}</td>
                                        <td>{data.putts}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link to={`/edit/${data.id}`} state={{ state: data.roundId }}>Edit</Link>
                        </div>
                    )
                })
            }

        </>
    )
}
export default HoleDetail


// explanation
/**
 * This code snippet is using the logical OR (||) operator to assign a value to the state variable in TypeScript.

It first checks if useLocation().state is truthy (i.e., not null, undefined, 0, '', false, or NaN). If it is, then state is assigned the value of useLocation().state.
If useLocation().state is falsy, it moves on to check if getDetails[0]?.roundId is truthy. The ?. is the optional chaining operator, which prevents an error if getDetails[0] is null or undefined. If getDetails[0]?.roundId is truthy, then state is assigned the value of getDetails[0]?.roundId.
If both useLocation().state and getDetails[0]?.roundId are falsy, then state is assigned an empty string ''.
This code snippet is a concise way of setting the state variable based on the existence and truthiness of certain values.
 */