import { apiSlice } from "../../app/api/apiSlice";
import { jwtDecode } from 'jwt-decode';
import { setCredentials } from "./authSlice";
export interface JwtPayload {
    userId: string
}

export const authApiSlice = apiSlice.injectEndpoints({
    // +----------------------------------------+
    // |              AUTH ROUTES               |
    // +----------------------------------------+
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: { ...credentials },
                credentials: 'include'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken } = data;
                    // Save the accessToken to localStorage
                    localStorage.setItem('accessToken', accessToken);
                    // You might also want to save user details in the state
                    dispatch(setCredentials({ accessToken: accessToken, user: data.user }));
                } catch (err) {
                    console.error('Login failed: ', err);
                }
            }
        }),
        signup: builder.mutation({
            query: credentials => ({
                url: '/signup',
                method: 'POST',
                body: { ...credentials },
                credentials: 'include'
            })
        }),

        // +----------------------------------------+
        // |           COURSE ROUTES               |
        // +----------------------------------------+



        // query for saved courses by user id
        getSavedCourses: builder.query({
            query: () => {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('Token not found');
                const decodedToken: JwtPayload = jwtDecode(token);
                const userId = decodedToken.userId;
                return {
                    url: `/courses/${userId}`,
                };
            }
        }),



        saveNewCourse: builder.mutation({
            query: () => {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('Token not found');
                const decodedToken: JwtPayload = jwtDecode(token);
                const userId = decodedToken.userId;
                return {
                    url: `/courses/save-new-course/${userId}`,
                    method: 'POST',
                    credentials: 'include'
                }
            }
        }),

        // +----------------------------------------+
        // |              GAME ROUTES               |
        // +----------------------------------------+

        // +----------------------------------------+
        // |              PEER ROUTES               |
        // +----------------------------------------+

        // +----------------------------------------+
        // |              STATS ROUTES              |
        // +----------------------------------------+
    })
})

export const { useLoginMutation, useSignupMutation, useGetSavedCoursesQuery, useSaveNewCourseMutation } = authApiSlice

