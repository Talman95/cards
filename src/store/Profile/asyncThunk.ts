import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppMessage, setAppStatus} from "../App/appSlice";
import {profileAPI} from "../../api/profileAPI";
import {handleAppError} from "../../utils/errorUtils";

export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (param: { name: string, avatar?: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            const res = await profileAPI.updateProfile(param.name, param.avatar)
            thunkAPI.dispatch(setAppStatus('idle'))
            thunkAPI.dispatch(setAppMessage('Name has been changed.'))
            return {profile: res.data.updatedUser}
        } catch(e) {
            return handleAppError(e, thunkAPI)
        }
    }
)