import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProfileType} from "../../a1-login/l3-dal/authAPI";
import {profileAPI} from "../p3-dal/profileAPI";
import {handleAppError} from "../../../../c0-common/c3-utils/errorUtils";
import {setAppMessage, setAppStatus} from "../../../../c1-main/m2-bll/appReducer";

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

const slice = createSlice({
    name: 'profile',
    initialState: {
        profile: null as null | ProfileType
    },
    reducers: {
        setProfile: (state, action: PayloadAction<{ profile: ProfileType | null }>) => {
            state.profile = action.payload.profile
        },
    },
    extraReducers: builder => {
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.profile = action.payload.profile
        })
    }
})

export const profileReducer = slice.reducer
export const {setProfile} = slice.actions