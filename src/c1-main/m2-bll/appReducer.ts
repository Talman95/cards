import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitType = {
    status: AppStatusType
    error: string | null
    isInitialized: boolean
    message: string | null
}

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false,
        message: null,
    } as InitType,
    reducers: {
        setAppStatus: (state, action: PayloadAction<AppStatusType>) => {
            state.status = action.payload
        },
        setAppError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setInitialization: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload
        },
        setAppMessage: (state, action: PayloadAction<string | null>) => {
            state.message = action.payload
        }
    },
})

export const {
    setAppStatus,
    setAppError,
    setInitialization,
    setAppMessage,
} = slice.actions
export const appReducer = slice.reducer