import { createSlice } from "@reduxjs/toolkit";

import { PayloadAction } from "@reduxjs/toolkit";

export type User = {
    email: string | null;
    username: string | null;
    password: string | null;
}

export type AuthState = {
    user: User | null;
    token: string | null;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null } as AuthState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User, accessToken: string | null }>) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        logOut: (state, action: PayloadAction<{ user: string | null, accessToken: string | null }>) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;


export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;