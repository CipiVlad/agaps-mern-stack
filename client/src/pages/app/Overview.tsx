import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MdDeleteForever } from "react-icons/md";
import { MdQueryStats } from "react-icons/md";

import './Overview.css'

export const Overview = () => {
    const [getData, setGetData] = useState([])
    const [getDataById, setGetDataById] = useState([])
    const [showData, setShowData] = useState(false)


    // delete by id
    const deleteById = async (id: string) => {
        const response = await axios.delete(`http://localhost:3000/course-info/${id}`)
        // const response = await axios.delete(`https://agaps-a-golf-analyze-web-app.onrender.com/course-info/${id}`)
        console.log(getDataById);
        setGetDataById(response.data)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3000/course-info')
            // const response = await axios.get('https://agaps-a-golf-analyze-web-app.onrender.com/course-info')
            setGetData(response.data)
            // console.log(getData);
        }
        fetchData()
    }, [getDataById])


    // console.log(getData);







    return (

        <div>
            <h2>Overview</h2>
            {/* show the data of the table concat-tables  */}
            <h3>last rounds</h3>
            {/* show only the last 5 rows */}
            {
                // getData.slice(0, 5).map((data: any, index: number) => {
                getData.slice(0, 1).map((data: any, index: number) => {
                    return (
                        <>
                            <div key={index} className="overviewCard">
                                <Link to={`/details/${data.roundId}`}>Course:{data.course}</Link>
                                <div className='date_round'>
                                    <p>Round: {data.round}</p>
                                    <p>Date: {data.formattedTimes.slice(0, 10)}</p>
                                </div>
                                <div className='icons'>
                                    <button onClick={() => confirm('Are you sure you want to delete?') && deleteById(data.roundId)}><MdDeleteForever /></button>

                                    <button><MdQueryStats /></button>
                                </div>
                                <hr />
                            </div>
                        </>
                    )
                })
            }
            {
                showData && getData.slice(1).map((data: any, index: number) => {
                    return (
                        <>
                            <div key={index} className="overviewCard">
                                <Link to={`/details/${data.roundId}`}>Course:{data.course}</Link>
                                <div className='date_round'>
                                    <p>Round: {data.round}</p>
                                    <p>Date: {data.formattedTimes.slice(0, 10)}</p>
                                </div>
                                <div className='icons'>
                                    <button onClick={() => confirm('Are you sure you want to delete?') && deleteById(data.roundId)}><MdDeleteForever /></button>
                                    <button><MdQueryStats /></button>
                                </div>
                                <hr />
                            </div>
                        </>

                    )
                }
                )
            }

            <button
                onClick={() => setShowData(!showData)}>
                {showData ? 'Hide' : 'Show more'}
            </button>
        </div>
    )

}