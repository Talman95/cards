import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAsyncThunks} from "./asyncThunk";

const {
    login,
    logout,
    register,
    sendPassword,
    setNewPassword,
} = authAsyncThunks

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isRegistered: false,
        isSent: false,
        isChangedPassword: false,
    },
    reducers: {
        setRegister: (state, action: PayloadAction<boolean>) => {
            state.isRegistered = action.payload
        },
        setSend: (state, action: PayloadAction<boolean>) => {
            state.isSent = action.payload
        },
        setStatusPassword: (state, action: PayloadAction<boolean>) => {
            state.isChangedPassword = action.payload
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.login
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.login
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.isRegistered = action.payload.isRegistered
        })
        builder.addCase(sendPassword.fulfilled, (state, action) => {
            state.isSent = action.payload.isSent
        })
        builder.addCase(setNewPassword.fulfilled, (state, action) => {
            state.isChangedPassword = action.payload.isChangedPassword
        })
    }
})

export const authSlice = slice.reducer
export const authActions = slice.actions