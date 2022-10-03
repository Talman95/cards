import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, RegisterParamsType} from "../../api/authAPI";
import {setAppMessage, setAppStatus, setInitialization} from "../App/appSlice";
import {setProfile} from "../Profile/profileSlice";
import {handleAppError} from "../../utils/errorUtils";

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
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            const res = await authAPI.authMe()
            thunkAPI.dispatch(setProfile({profile: res.data}))
            thunkAPI.dispatch(setAppStatus('idle'))
            thunkAPI.dispatch(setInitialization(true))
            return {login: true}
        } catch {
            thunkAPI.dispatch(setAppStatus('failed'))
            thunkAPI.dispatch(setInitialization(true))
            return thunkAPI.rejectWithValue({login: false})
        }
    })

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
    })

export const register = createAsyncThunk(
    'auth/register',
    async (params: RegisterParamsType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await authAPI.register(params)
            thunkAPI.dispatch(setAppStatus('idle'))
            thunkAPI.dispatch(setAppMessage('Registration is successful'))
            return {isRegistered: true}
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })

export const sendPassword = createAsyncThunk<{ isSent: boolean }, string, {
    rejectValue: { error: string }
}>('auth/sendPassword',
    async (email, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await authAPI.sendPassword(email)
            thunkAPI.dispatch(setAppStatus('idle'))
            thunkAPI.dispatch(setAppMessage('Message has been sent successfully'))
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
            thunkAPI.dispatch(setAppMessage('Password has been changed successfully'))
            return {isChangedPassword: true}
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })