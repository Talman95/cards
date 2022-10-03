import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProfileType} from "../../api/authAPI";
import {profileAsyncThunks} from "./asyncThunk";

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
        builder.addCase(profileAsyncThunks.updateProfile.fulfilled, (state, action) => {
            state.profile = action.payload.profile
        })
    }
})

export const profileSlice = slice.reducer
export const profileActions = slice.actions