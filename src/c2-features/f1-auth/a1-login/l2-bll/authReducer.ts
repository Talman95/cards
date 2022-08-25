import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, RegisterParamsType} from "../l3-dal/authAPI";
import {setProfile} from "../../a3-profile/p2-bll/profileReducer";
import axios, {AxiosError} from "axios";

export const login = createAsyncThunk<{ login: boolean }, LoginParamsType, {
    rejectValue: { error: string }
}>('auth/login',
    async (params: LoginParamsType, thunkAPI) => {
        try {
            const res = await authAPI.login(params)
            thunkAPI.dispatch(setProfile({profile: res.data}))
            return {login: true}
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                return thunkAPI.rejectWithValue({error: error})
            } else {
                return thunkAPI.rejectWithValue({error: `Native error ${err.message}`})
            }
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
export const register = createAsyncThunk<{ isRegistered: boolean }, RegisterParamsType, {
    rejectValue: { error: string }
}>('auth/register',
    async (params: RegisterParamsType, thunkAPI) => {
        try {
            await authAPI.register(params)
            return {isRegistered: true}
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                return thunkAPI.rejectWithValue({error: error})
            } else {
                return thunkAPI.rejectWithValue({error: `Native error ${err.message}`})
            }
        }
    }
)
export const sendPassword = createAsyncThunk<{ isSend: boolean }, string, {
    rejectValue: { error: string }
}>('auth/sendPassword',
    async (email, thunkAPI) => {
        try {
            await authAPI.sendPassword(email)
            return {isSend: true}
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                return thunkAPI.rejectWithValue({error: error})
            } else {
                return thunkAPI.rejectWithValue({error: `Native error ${err.message}`})
            }
        }
    })
export const setNewPassword = createAsyncThunk<{ isChangedPassword: true }, { password: string, token: string | undefined }, {
    rejectValue: { error: string }
}>('auth/setNewPassword',
    async (param: { password: string, token: string | undefined }, thunkAPI) => {
        try {
            await authAPI.setNewPassword(param.password, param.token)
            return {isChangedPassword: true}
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                return thunkAPI.rejectWithValue({error: error})
            } else {
                return thunkAPI.rejectWithValue({error: `Native error ${err.message}`})
            }
        }
    })

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
        builder.addCase(setNewPassword.fulfilled, (state, action) => {
            state.isChangedPassword = action.payload.isChangedPassword
        })
    }
})

export const authReducer = slice.reducer
export const {setRegister, setSend, setStatusPassword} = slice.actions