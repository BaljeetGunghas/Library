import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginForm, RegisterForm, User } from '../types/user';

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // 🔐 Register
        registerRequest(state, action: PayloadAction<RegisterForm>) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action: PayloadAction<{ user: User | null; token: string }>) {
            console.log(action.payload,'payload');
            
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
        },
        registerFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // 🔐 Login
        loginRequest(state, action: PayloadAction<LoginForm>) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<{ user: User | null; token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        logoutRequest(state) {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess(state) {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("token"); // clear token
            localStorage.removeItem("user"); // clear user
        },
        logoutFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },



        // 🌀 Shared
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export const {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    setLoading,
    logoutRequest,
    logoutSuccess,
    logoutFailure
} = authSlice.actions;

export default authSlice.reducer;
