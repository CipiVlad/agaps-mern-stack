import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
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
        // query for saved courses by user id
        getSavedCourses: builder.query({
            query: (id) => ({
                url: `/courses/664dfbad9c477772e32cb372`,
                credentials: 'include'
            }),

        })
    })
})

export const { useLoginMutation, useSignupMutation, useGetSavedCoursesQuery } = authApiSlice

