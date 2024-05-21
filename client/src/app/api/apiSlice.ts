import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error && result.error.status === 403) {
        try {
            const refreshResult = await baseQuery('/refresh', api, extraOptions);
            if (refreshResult?.data && typeof refreshResult.data === 'object' && 'accessToken' in refreshResult.data) {
                const user = api.getState().auth.user;
                const accessToken = refreshResult.data.accessToken as string | null;
                api.dispatch(setCredentials({ ...refreshResult.data, user, accessToken }));
                result = await baseQuery(args, api, extraOptions);
            }
        } catch (error) {
            api.dispatch(logOut({ user: null, accessToken: null }));
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});

