import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, RegisterParamsType} from "../../api/authAPI";
import {handleAppError} from "../../utils/errorUtils";
import {profileActions} from "../Profile/profileSlice";
import {authActions} from "./authSlice";
import {appActions} from "../CommonActions/App";

const setProfile = profileActions.setProfile
const {setAppStatus, setAppMessage, setInitialization} = appActions

const login = createAsyncThunk(
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

const getAuthData = createAsyncThunk(
    'auth/authMe',
    async (param: undefined, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            const res = await authAPI.authMe()
            thunkAPI.dispatch(setProfile({profile: res.data}))
            thunkAPI.dispatch(authActions.setLoggedIn(true))
            thunkAPI.dispatch(setInitialization(true))
            thunkAPI.dispatch(setAppStatus('idle'))
            return null
        } catch {
            thunkAPI.dispatch(setInitialization(true))
            thunkAPI.dispatch(setAppStatus('failed'))
            return thunkAPI.rejectWithValue({login: false})
        }
    })

const logout = createAsyncThunk(
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

const register = createAsyncThunk(
    'auth/register',
    async (params: RegisterParamsType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await authAPI.register(params)
            thunkAPI.dispatch(setAppStatus('idle'))
            thunkAPI.dispatch(setAppMessage({result: 'success', message: 'Registration is successful'}))
            return {isRegistered: true}
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })

const sendPassword = createAsyncThunk<null, string, {
    rejectValue: { error: string }
}>('auth/sendPassword',
    async (email, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await authAPI.sendPassword(email)
            thunkAPI.dispatch(setAppStatus('idle'))
            thunkAPI.dispatch(setAppMessage({result: 'success', message: 'Message has been sent successfully'}))
            return null
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })

const setNewPassword = createAsyncThunk<null, { password: string, token: string | undefined }, {
    rejectValue: { error: string }
}>('auth/setNewPassword',
    async (param: { password: string, token: string | undefined }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await authAPI.setNewPassword(param.password, param.token)
            thunkAPI.dispatch(setAppStatus('idle'))
            thunkAPI.dispatch(setAppMessage({result: "success", message: 'Password has been changed successfully'}))
            return null
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })

export const authAsyncThunks = {
    login,
    getAuthData,
    logout,
    register,
    sendPassword,
    setNewPassword,
}