import {createAsyncThunk} from "@reduxjs/toolkit";
import {profileAPI} from "../../api/profileAPI";
import {handleAppError} from "../../utils/errorUtils";
import {appActions} from "../CommonActions/App";
import {RootState} from "../store";

const {setAppStatus, setAppMessage} = appActions

const updateProfile = createAsyncThunk(
    'profile/updateAvatarProfile',
    async (param: {name?: string, avatar?: string}, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            const state = thunkAPI.getState() as RootState
            const profile = state.profile.profile
            if (!profile) throw new Error('Profile not found')

            const newName = param.name || profile.name
            const newAvatar = param.avatar || profile.avatar

            const res = await profileAPI.updateProfile(newName, newAvatar)
            thunkAPI.dispatch(setAppStatus('idle'))
            thunkAPI.dispatch(setAppMessage({result: 'success', message: 'Profile updated'}))
            return {profile: res.data.updatedUser}
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    }
)

export const profileAsyncThunks = {
    updateProfile,
}