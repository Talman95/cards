import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, RegisterParamsType} from "../l3-dal/authAPI";
import {setProfile} from "../../a3-profile/p2-bll/profileReducer";

export const login = createAsyncThunk(
    'auth/login',
    async (params: LoginParamsType, thunkAPI) => {
        try {
            const res = await authAPI.login(params)
            thunkAPI.dispatch(setProfile({profile: res.data}))
            return {login: true}
        } catch {
            return thunkAPI.rejectWithValue({login: false})
        }
    })
export const getAuthData = createAsyncThunk(
    'auth/authMe',
    async (param: undefined, thunkAPI) => {
        try {
            const res = await authAPI.authMe()
            thunkAPI.dispatch(setProfile({profile: res.data}))
            return {login: true}
        } catch {
            return thunkAPI.rejectWithValue({login: false})
        }
    }
)
export const logout = createAsyncThunk(
    'auth/logout',
    async (param: undefined, thunkAPI) => {
        try {
            await authAPI.logout()
            thunkAPI.dispatch(setProfile({profile: null}))
            return {login: false}
        } catch {
            return thunkAPI.rejectWithValue({login: true})
        }
    }
)
export const register = createAsyncThunk(
    'auth/register',
    async (params: RegisterParamsType, thunkAPI) => {
        try {
            await authAPI.register(params)
            return {isRegistered: true}
        } catch {
            return thunkAPI.rejectWithValue({isRegistered: false})
        }
    }
)
export const sendPassword = createAsyncThunk(
    'auth/sendPassword',
    async (email: string, thunkAPI) => {
        try {
            await authAPI.sendPassword(email)
            return {isSend: true}
        } catch {
            return thunkAPI.rejectWithValue(null)
        }
    })

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isRegistered: false,
        isSent: false,
    },
    reducers: {
        setRegister: (state, action: PayloadAction<boolean>) => {
            state.isRegistered = action.payload
        },
        setSend: (state, action: PayloadAction<boolean>) => {
            state.isSent = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.login
        })
        builder.addCase(getAuthData.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.login
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.login
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.isRegistered = action.payload.isRegistered
        })
        builder.addCase(sendPassword.fulfilled, (state, action) => {
            state.isSent = action.payload.isSend
        })
    }
})

export const authReducer = slice.reducer
export const {setRegister, setSend} = slice.actions