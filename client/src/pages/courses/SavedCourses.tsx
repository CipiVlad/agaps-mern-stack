import { useSelector } from "react-redux"
import { useGetSavedCoursesQuery } from "../../features/auth/authApiSlice"
import TopNav from "../navigation/TopNav"
import GoBack from "../navigation/GoBack"
import { RootState } from "../../app/store"
import { Link } from "react-router-dom"
import { useState } from "react"


const SavedCourses = () => {

    //get token from store
    const token = useSelector((state: RootState) => state.auth.token)
    const { data: data, isLoading } = useGetSavedCoursesQuery(token)


    const allCourseData = data && data.flatMap((each: any) => each.courseInfo)

    // state of allCourseData
    const [getCourseData, setGetCourseData] = useState<any>(allCourseData || [])


    if (isLoading) {
        return <div>Loading...</div>
    }
    const courseNames = allCourseData && allCourseData.map((each: any, index: number) => {
        return (
            <div key={each._id}>
                {/* send selected course data with state to CourseDetail */}
                {each ? (
                    <Link
                        to={`/course-details/${each._id}`}
                        state={getCourseData[index]}
                    >
                        {each.courseName}
                    </Link>
                ) : null}
            </div>
        )
    })





    return (
        <div>
            <TopNav />
            <h1>Saved Courses</h1>
            <h3>Course Names:</h3>
            {courseNames}
            <br />
            <GoBack />
        </div>
    )
}
export default SavedCourses