import axios, {AxiosError} from "axios";
import {setAppError, setAppStatus} from "../../c1-main/m2-bll/appReducer";
import {Dispatch} from "redux";

type DispatchType = Dispatch<ReturnType<typeof setAppStatus> | ReturnType<typeof setAppError>>
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
        thunkAPI.dispatch(setAppError(error))
        thunkAPI.dispatch(setAppStatus('failed'))
        return thunkAPI.rejectWithValue({error: error})
    } else {
        thunkAPI.dispatch(setAppError(`Native error ${err.message}`))
        thunkAPI.dispatch(setAppStatus('failed'))
        return thunkAPI.rejectWithValue({error: `Native error ${err.message}`})
    }
}