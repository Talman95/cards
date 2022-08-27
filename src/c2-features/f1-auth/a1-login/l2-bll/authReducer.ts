import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, RegisterParamsType} from "../l3-dal/authAPI";
import {setProfile} from "../../a3-profile/p2-bll/profileReducer";
import {handleAppError} from "../../../../c0-common/c3-utils/errorUtils";
import {setAppStatus} from "../../../../c1-main/m2-bll/appReducer";

export const login = createAsyncThunk(
    'auth/login',
    async (params: LoginParamsType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            const res = await authAPI.login(params)
            thunkAPI.dispatch(setProfile({profile: res.data}))
            thunkAPI.dispatch(setAppStatus('idle'))
            return {login: true}
        } catch (e) {
            return handleAppError(e, thunkAPI)
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
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await authAPI.logout()
            thunkAPI.dispatch(setProfile({profile: null}))
            thunkAPI.dispatch(setAppStatus('idle'))
            return {login: false}
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    }
)
export const register = createAsyncThunk(
    'auth/register',
    async (params: RegisterParamsType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await authAPI.register(params)
            thunkAPI.dispatch(setAppStatus('idle'))
            return {isRegistered: true}
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    }
)
export const sendPassword = createAsyncThunk<{ isSent: boolean }, string, {
    rejectValue: { error: string }
}>('auth/sendPassword',
    async (email, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await authAPI.sendPassword(email)
            thunkAPI.dispatch(setAppStatus('idle'))
            return {isSent: true}
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })
export const setNewPassword = createAsyncThunk<{ isChangedPassword: true }, { password: string, token: string | undefined }, {
    rejectValue: { error: string }
}>('auth/setNewPassword',
    async (param: { password: string, token: string | undefined }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await authAPI.setNewPassword(param.password, param.token)
            thunkAPI.dispatch(setAppStatus('idle'))
            return {isChangedPassword: true}
        } catch (e) {
            return handleAppError(e, thunkAPI)
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
            state.isSent = action.payload.isSent
        })
        builder.addCase(setNewPassword.fulfilled, (state, action) => {
            state.isChangedPassword = action.payload.isChangedPassword
        })
    }
})

export const authReducer = slice.reducer
export const {setRegister, setSend, setStatusPassword} = slice.actions