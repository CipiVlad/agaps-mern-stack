import { useLocation } from "react-router-dom"


const CourseDetails = () => {
    const { state } = useLocation()
    console.log(state)

    return (
        <div>
            <h1>Course Details of:</h1>
            {/* <h2>{state && state.courseName}</h2> */}

        </div>
    )
}
export default CourseDetails