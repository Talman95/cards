import {authActions, authSlice} from './authSlice';
import {authAPI, LoginParamsType, ProfileType} from "../../api/authAPI";
import {AsyncThunkAction} from "@reduxjs/toolkit";
import {AxiosError, AxiosResponse} from "axios";
import {profileActions} from "../Profile/profileSlice";
import {appActions} from "../CommonActions/App";
import {authAsyncThunks} from "./asyncThunk";

describe('authSlice', () => {
    let state: {
        isLoggedIn: boolean,
        isRegistered: boolean,
    }

    beforeEach(() => {
        state = {
            isLoggedIn: false,
            isRegistered: false,
        }
    })

    it('should return default state when we pass empty action', () => {
        const result = authSlice(undefined, {type: ''})

        expect(result).toEqual(state)
    })

    it('registration should be completed', () => {
        const action = authActions.setRegister(true)
        const result = authSlice(state, action)

        expect(result.isRegistered).toBeTruthy()
        expect(result.isLoggedIn).toBeFalsy()
    })

    it('login should be completed', () => {
        const action = authActions.setLoggedIn(true)
        const result = authSlice(state, action)

        expect(result.isRegistered).toBeFalsy()
        expect(result.isLoggedIn).toBeTruthy()
    })
})

// tests for asyncThunk

jest.mock('../../api/authAPI')
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>

const dispatch = jest.fn()
const getState = jest.fn()

describe('asyncThunk', () => {
    let thunk: AsyncThunkAction<void, LoginParamsType, {}>
    let arg: LoginParamsType

    beforeEach(() => {
        dispatch.mockClear()
        getState.mockClear()
    })

    describe('should login with resolve response', () => {
        let result: AxiosResponse<ProfileType>
        const loginResult = {
            avatar: '',
            created: '',
            email: '',
            isAdmin: false,
            name: '',
            publicCardPacksCount: 1,
            rememberMe: false,
            token: '',
            tokenDeathTime: 0,
            updated: '',
            verified: true,
            __v: 1,
            _id: '',
        }

        beforeEach(() => {
            authAPIMock.login.mockClear();
            authAPIMock.login.mockResolvedValue(result)

            arg = {email: 'email', password: 'pass', rememberMe: true}
            result = {status: 200, data: loginResult, statusText: '', config: {}, headers: {}}

            thunk = authAsyncThunks.login(arg)
        })

        it('calls the api correctly', async () => {
            await thunk(dispatch, getState, undefined)

            expect(authAPIMock.login).toHaveBeenCalledWith(arg)
        })

        it('success login call', async () => {
            await thunk(dispatch, getState, undefined)

            const {calls} = dispatch.mock

            expect(calls).toHaveLength(5)
            expect(calls[0][0].type).toBe('auth/login/pending')
            expect(dispatch).toHaveBeenNthCalledWith(2, appActions.setAppStatus('loading'))
            expect(dispatch).toHaveBeenNthCalledWith(3, profileActions.setProfile({profile: result.data}))
            expect(dispatch).toHaveBeenNthCalledWith(4, appActions.setAppStatus('idle'))
            expect(calls[4][0].type).toBe('auth/login/fulfilled')
            expect(calls[4][0].payload).toStrictEqual({login: true})
        })
    })

    it('should login with rejected response', async () => {
        let error: Error | AxiosError<{ error: string }>

        const errorMessage = 'Something wrong'
        error = {isAxiosError: true, message: errorMessage, name: 'Error'}

        authAPIMock.login.mockClear()
        authAPIMock.login.mockRejectedValue(error)

        thunk = authAsyncThunks.login(arg)

        await thunk(dispatch, getState, undefined)

        const {calls} = dispatch.mock

        expect(calls).toHaveLength(5)
        expect(calls[0][0].type).toBe('auth/login/pending')
        expect(dispatch).toHaveBeenNthCalledWith(2, appActions.setAppStatus('loading'))
        expect(dispatch).toHaveBeenNthCalledWith(3, appActions.setAppMessage({result: 'error', message: errorMessage}))
        expect(dispatch).toHaveBeenNthCalledWith(4, appActions.setAppStatus('failed'))
        expect(calls[4][0].type).toBe('auth/login/rejected')
        expect(calls[4][0].payload).toStrictEqual({error: errorMessage})
    })
})