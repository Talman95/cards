import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProfileType} from "../../a1-login/l3-dal/authAPI";

const slice = createSlice({
    name: 'profile',
    initialState: {
        profile: null as null | ProfileType
    },
    reducers: {
        setProfile: (state, action: PayloadAction<{profile: ProfileType | null}>) => {
            state.profile = action.payload.profile
        }
    },
})

export const profileReducer = slice.reducer
export const {setProfile} = slice.actions