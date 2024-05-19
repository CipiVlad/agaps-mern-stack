// src/services/user.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/User';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => 'users',
        }),
        // query for single-mode http://localhost:3000/single-mode/:id
        getSingleModeUser: builder.query<User, string>({
            query: (id) => `single-mode/${id}`,
        })
    })
})


export const { useGetAllUsersQuery, useGetSingleModeUserQuery } = userApi;
