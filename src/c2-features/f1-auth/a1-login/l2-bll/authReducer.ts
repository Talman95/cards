import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from "../l3-dal/authAPI";
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

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.login
        })
        builder.addCase(getAuthData.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.login
        })
    }
})

export const authReducer = slice.reducer