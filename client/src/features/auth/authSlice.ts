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
    // initialState: { user: null, token: null } as AuthState,
    initialState: {
        user: null,
        token: localStorage.getItem('accessToken') || null, // Token aus localStorage initialisieren
    } as AuthState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User, accessToken: string }>) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
            localStorage.setItem('accessToken', accessToken); // Token im localStorage speichern
        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('accessToken'); // Token aus localStorage entfernen
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