import { useSelector } from "react-redux";
import { useDeleteCourseMutation, useGetSavedCoursesQuery } from "../../features/auth/authApiSlice";
import TopNav from "../navigation/TopNav";
import GoBack from "../navigation/GoBack";
import { RootState } from "../../app/store";
import { AiFillDelete } from "react-icons/ai";


import { jwtDecode } from "jwt-decode"
import { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
    username: string;
    userId: string | null;
}

const SavedCourses = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const { data, isLoading } = useGetSavedCoursesQuery(token);

    const userId = jwtDecode<CustomJwtPayload>(token)?.userId;

    const [deleteCourse] = useDeleteCourseMutation();

    // const allCourseData = data && data.flatMap((each: any) => each.courseInfo);
    const allCourseData = data && data.flatMap((each: any) => each);
    const eachCourseId = data && data.flatMap((each: any) => each._id);

    console.log(allCourseData);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleDeleteCourse = async (courseId: string) => {
        if (userId) {
            console.log(`Deleting course with ID: ${courseId} for user: ${userId}`);
            try {
                const response = await deleteCourse({ userId, courseId }).unwrap();
                console.log('Delete response:', response);
                // Optionally refresh the list of courses
            } catch (error: any) {
                console.error('Failed to delete course: ', error);
                if (error.status === 'PARSING_ERROR') {
                    alert('Failed to delete course: Forbidden');
                }
            }
        } else {
            console.error('User ID is null');
        }
    };

    const getCourseData = allCourseData && allCourseData.map((each: any) => {
        return (
            <div key={each._id}>
                <h3>
                    {each.courseInfo[0].courseName}
                </h3>
                <h3>
                    <AiFillDelete onClick={() => handleDeleteCourse(each._id)} />
                </h3>
            </div>
        );
    })


    // const getCourseNames = allCourseData && allCourseData.map((each: any) => {
    //     return (
    //         <div key={each._id}>
    //             <h3>
    //                 {each.courseName}
    //             </h3>

    //         </div>
    //     );
    // });

    // const getCourseIds = eachCourseId && eachCourseId.map((each: any) => {
    //     return (
    //         <div key={each}>
    //             <h3>
    //                 <AiFillDelete onClick={() => handleDeleteCourse(each)} />
    //             </h3>
    //         </div>
    //     );
    // })
    return (
        <div>
            <TopNav />
            <h1>Saved Courses</h1>
            <h3>Course Names:</h3>
            <div>
                {/* {getCourseNames}
                {getCourseIds} */}
                {getCourseData}
            </div>
            <br />
            <GoBack />
        </div>
    );
};

export default SavedCourses;