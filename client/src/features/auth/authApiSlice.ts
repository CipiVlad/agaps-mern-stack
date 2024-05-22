import { User } from './../../interfaces/User';
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
    })
})

export const { useLoginMutation, useSignupMutation } = authApiSlice

