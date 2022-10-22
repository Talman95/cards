import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {usersAPI} from "../../api/usersAPI";
import {appActions} from "../CommonActions/App";
import {handleAppError} from "../../utils/errorUtils";

const {setAppStatus} = appActions

const getUsers = createAsyncThunk(
    'users/getUsers',
    async (param: undefined, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            const state = thunkAPI.getState() as RootState
            const filter = {...state.users.filter}
            const res = await usersAPI.getUsers(filter)
            thunkAPI.dispatch(setAppStatus('idle'))
            return res.data
        } catch(e) {
            return handleAppError(e, thunkAPI)
        }
    })

export const usersAsyncThunk = {
    getUsers,
}