import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetSavedCoursesQuery } from "../../features/auth/authApiSlice"
import { jwtDecode, JwtPayload } from "jwt-decode"

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

const SavedCourses = () => {

    //how to get token from store
    const token = useSelector((state: any) => state.auth.token)
    const { data: courseData } = useGetSavedCoursesQuery(token)
    console.log(courseData);


    const dispatch = useDispatch()

    return (
        <div>
            <h1>Saved Courses</h1>

            {/* 
            {
                courseData && courseData.map((each: any, index: number) => {
                    return (
                        <div key={each._id}>
                            <p>Hole: {each.hole} Par: {each.par}</p>
                        </div>
                    )
                })
            } */}

        </div>
    )
}
export default SavedCourses