import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import HoleCardStart from "../../components/HoleCardStart"
const AddCourseInfo = () => {

    const [showHoleCard, setShowHoleCard] = useState<boolean>(false)

    const navigate = useNavigate()
    const [course, setCourse] = useState<string>("")
    const [round, setRound] = useState<string>("")
    let [newPostObj, setNewPostObj] = useState<any>()
    const optionCourse = [
        { value: "", text: ">--Choose--<" },
        { value: "GCK", text: "GCK" }
    ]

    const optionRound = [
        { value: "", text: ">--Choose--<" },
        { value: "half", text: "half" },
        { value: "full", text: "full" }
    ]

    const handleChangeCourse = (e: any) => {
        setCourse(e.target.value)
    }
    const handleChangeRound = (e: any) => {
        setRound(e.target.value)
    }

    //random String
    const randomString = () => {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        newPostObj = {
            roundId: randomString(),
            course: course,
            round: round
        }

        try {
            const response = await axios.post("http://localhost:3000/course-info", newPostObj)
            // const response = await axios.post("https://agaps-a-golf-analyze-web-app.onrender.com/course-info", newPostObj)
            console.log(response.data.insertedId)
            setNewPostObj(response.data.insertedId)
            navigate("/hole-card/1", { state: newPostObj.roundId })
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <div>
            <h2>Add Round</h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                <label htmlFor="course">Course:</label>
                <select name="course" id="course" onChange={handleChangeCourse}>
                    {optionCourse.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
                <label htmlFor="round">Round:</label>
                <select name="round" id="round" onChange={handleChangeRound}>
                    {optionRound.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>


                {
                    course && round && <button type="submit" >Let's Go!</button>
                }



            </form>
        </div >
    )

}
export default AddCourseInfo