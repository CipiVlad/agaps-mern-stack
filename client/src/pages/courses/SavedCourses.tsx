import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useGetSavedCoursesQuery } from "../../features/auth/authApiSlice"


const SavedCourses = () => {
    const { data, isLoading } = useGetSavedCoursesQuery({ credentials: 'include' })

    const courseData = data[0].courseInfo[0].courseData

    return (
        <div>

            {
                courseData && courseData.map((each: any, index: number) => {
                    return (
                        <div key={each._id}>
                            <p>Hole: {each.hole} Par: {each.par}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}
export default SavedCourses