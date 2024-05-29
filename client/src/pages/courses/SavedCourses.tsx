import { useSelector } from "react-redux"
import { useGetSavedCoursesQuery } from "../../features/auth/authApiSlice"
import TopNav from "../navigation/TopNav"
import GoBack from "../navigation/GoBack"
import { RootState } from "../../app/store"
import { useState } from "react"
//delete icon
import { AiFillDelete } from "react-icons/ai"

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


    //handle delete by id
    const handleDeleteCourse = async (id: string) => {
        console.log(id);

    }


    const getCourseNames = allCourseData && allCourseData.map((each: any, index: number) => {
        return (
            <div key={each._id}>
                {/* send selected course data with state to CourseDetail */}
                {each ? (
                    <h3>{each.courseName}
                        <AiFillDelete
                            onClick={() => handleDeleteCourse(each._id)}
                            style={{
                                color: "red",
                                cursor: "pointer",
                                marginLeft: "10px"
                            }} />
                    </h3>
                ) : null}
            </div>
        )
    })





    return (
        <div>
            <TopNav />
            <h1>Saved Courses</h1>
            <h3>Course Names:</h3>
            {getCourseNames}
            <br />
            <GoBack />
        </div>
    )
}
export default SavedCourses