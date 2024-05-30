import { useSelector } from "react-redux"
import { useDeleteCourseMutation, useGetSavedCoursesQuery } from "../../features/auth/authApiSlice"


import TopNav from "../navigation/TopNav"
import GoBack from "../navigation/GoBack"
import { RootState } from "../../app/store"
//delete icon
import { AiFillDelete } from "react-icons/ai"
import axios from "axios"

import { jwtDecode } from "jwt-decode"
import { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
    username: string;
    userId: string | null
}


const SavedCourses = () => {

    //get token from store
    const token = useSelector((state: RootState) => state.auth.token)
    const { data: data, isLoading } = useGetSavedCoursesQuery(token)

    const userId = jwtDecode<CustomJwtPayload>(token)?.userId
    // console.log(userId);



    const [deleteCourse] = useDeleteCourseMutation();
    const allCourseData = data && data.flatMap((each: any) => each.courseInfo)

    if (isLoading) {
        return <div>Loading...</div>
    }


    //handle delete by id
    const handleDeleteCourse = async (courseId: string) => {
        console.log(`Deleting course with ID: ${courseId} for user: ${userId}`);
        try {
            await deleteCourse({ userId, courseId }).unwrap();
            // Optional: Refresh the course list or remove the course from the UI
        } catch (error: any) {
            console.error('Failed to delete course: ', error);
            if (error.status === 'PARSING_ERROR') {
                alert('Failed to delete course: Forbidden');
            }
        }
    };

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