// src/services/user.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/User';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => 'users',
        })
    })
});

export const { useGetAllUsersQuery } = userApi;
