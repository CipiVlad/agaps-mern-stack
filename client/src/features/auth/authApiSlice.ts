import { apiSlice } from "../../app/api/apiSlice";
import { jwtDecode } from 'jwt-decode';

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
            })
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
            // query: userId => {
            //     return {
            //         url: `/courses/${userId}`,
            //         credentials: 'include',
            //         method: 'GET',
            //     }
            // }

            query: recievedToken => {
                console.log("Received token:", recievedToken); // Log the received token
                const decodeToken: JwtPayload = jwtDecode(recievedToken);

                console.log("Decoded token:", decodeToken); // Log the decoded token
                const thisUser = decodeToken.userId
                return {
                    url: `/courses/${thisUser}`,
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

export const { useLoginMutation, useSignupMutation, useGetSavedCoursesQuery } = authApiSlice

