import { useState } from "react"
import { useSaveNewCourseMutation } from "../../features/auth/authApiSlice"
import GoBack from "../navigation/GoBack"
import { useNavigate } from "react-router-dom"


const SaveNewCourse = () => {
    const navigate = useNavigate();
    const [saveNewCourse, { isLoading }] = useSaveNewCourseMutation();
    const [courseName, setCourseName] = useState("")
    const [hole, setHole] = useState<number | string>();
    const [par, setPar] = useState<number | string>();



    const [courseInfo, setCourseInfo] = useState<any>([])

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setCourseInfo([...courseInfo, {
            "courseName": courseName,
            "courseData": [{
                "hole": hole,
                "par": par
            }]
        }]);

        // const response = await saveNewCourse({ courseInfo }).unwrap();
        // console.log(response);
        // navigate('/courses');

        console.log({ courseInfo });
    }




    return (
        <div>
            <h1>Save New Course</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="courseName">Course Name:</label>
                <br />
                <input
                    type="text"
                    name="courseName"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                />
                <br />
                <p>Course Data:</p>
                <br />
                <label htmlFor="hole">Hole #:</label>
                <br />
                <input
                    type="number"
                    name="hole"
                    value={hole ?? ""}
                    onChange={(e) => setHole(parseInt(e.target.value) ?? 0)}
                />
                <br />
                <label htmlFor="par">Par:</label>
                <br />
                <input
                    type="number"
                    name="par"
                    value={par ?? ""} //if par is undefined, it will be an empty string
                    onChange={(e) => setPar(parseInt(e.target.value) ?? 0)} //  if parseInt(e.target.value) is NaN, it will be 0
                />
                <p>In this App - Version you can only use the given Course Data: GCK.
                    In a later version an API with many Golf Courses is possible.
                    But for now you can enter the name and hole 1 for a mock data example.
                </p>

                <button type="submit">Submit</button>

            </form>
            <GoBack />
        </div>
    )
}
export default SaveNewCourse