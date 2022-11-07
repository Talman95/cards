import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {usersAPI} from "../../api/usersAPI";
import {appActions} from "../CommonActions/App";
import {handleAppError} from "../../utils/errorUtils";
import {appStatus} from "../../enums/appStatus";

const {setAppStatus} = appActions

const getUsers = createAsyncThunk(
    'users/getUsers',
    async (param: undefined, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus(appStatus.LOADING))
        try {
            const state = thunkAPI.getState() as RootState
            const filter = {...state.users.filter}
            const res = await usersAPI.getUsers(filter)
            thunkAPI.dispatch(setAppStatus(appStatus.IDLE))
            return res.data
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })

const getUserData = createAsyncThunk(
    'users/getUserData',
    async (id: string, thunkAPI) => {
        try{
            const res = await usersAPI.getUserData(id)
            return {user: res.data.user}
        } catch(e) {
            return handleAppError(e, thunkAPI)
        }
    })

export const usersAsyncThunk = {
    getUsers,
    getUserData,
}