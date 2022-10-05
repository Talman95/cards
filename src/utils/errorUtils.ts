import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {appActions} from "../store/CommonActions/App";

const {setAppStatus, setAppMessage} = appActions

type DispatchType = Dispatch<ReturnType<typeof setAppStatus> | ReturnType<typeof setAppMessage>>
type ThunkAPIType = {
    dispatch: DispatchType
    rejectWithValue: Function
}

export const handleAppError = (
    e: any,
    thunkAPI: ThunkAPIType,
) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        thunkAPI.dispatch(setAppMessage({result: 'error', message: error}))
        thunkAPI.dispatch(setAppStatus('failed'))
        return thunkAPI.rejectWithValue({error: error})
    } else {
        thunkAPI.dispatch(setAppMessage({result: 'error', message: `Native error ${err.message}`}))
        thunkAPI.dispatch(setAppStatus('failed'))
        return thunkAPI.rejectWithValue({error: `Native error ${err.message}`})
    }
}