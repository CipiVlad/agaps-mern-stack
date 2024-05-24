import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetSavedCoursesQuery } from "../../features/auth/authApiSlice"
import { jwtDecode, JwtPayload } from "jwt-decode"
import { Link } from "react-router-dom"
import TopNav from "../navigation/TopNav"
import GoBack from "../navigation/GoBack"


const SavedCourses = () => {

    //get token from store
    const token = useSelector((state: any) => state.auth.token)
    const { data: data, isLoading } = useGetSavedCoursesQuery(token)


    const allCourseData = data && data.flatMap((each: any) => each.courseInfo)
    console.log(allCourseData);

    if (isLoading) {
        return <div>Loading...</div>
    }

    const content = allCourseData && allCourseData.map((each: any) => {
        return (
            <div key={each._id}>
                <p> {each.courseName}</p>
                {
                    each.holes && each.holes.map((each: any) => {
                        return (
                            <p key={each._id}>Hole: {each.holeNumber}</p>
                        )
                    })
                }
            </div>
        )
    })


    return (
        <div>
            <TopNav />
            <h1>Saved Courses</h1>
            <h3>Course Names:</h3>
            {content}
            <br />
            <GoBack />
        </div>
    )
}
export default SavedCourses