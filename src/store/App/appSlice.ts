import {createSlice} from "@reduxjs/toolkit";
import {appActions as commonActions} from "../CommonActions/App";
import {AlertColor} from "@mui/material";

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false,
        status: 'idle',
        error: null as string | null,
        message: null as string | null,
        result: 'success' as AlertColor,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(commonActions.setAppStatus, (state, action) => {
                state.status = action.payload
            })
            .addCase(commonActions.setAppMessage, (state, action) => {
                state.message = action.payload.message
                state.result = action.payload.result
            })
            .addCase(commonActions.setInitialization, (state, action) => {
                state.isInitialized = action.payload
            })
    }
})

export const appSlice = slice.reducer