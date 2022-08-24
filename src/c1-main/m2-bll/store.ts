import {combineReducers} from "redux";
import {authReducer} from "../../c2-features/f1-auth/a1-login/l2-bll/authReducer";
import {profileReducer} from "../../c2-features/f1-auth/a3-profile/p2-bll/profileReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducers = combineReducers({
    auth: authReducer,
    profile: profileReducer,
})

export const store = configureStore({
    reducer: rootReducers
})

export type RootStateType = ReturnType<typeof rootReducers>

export type RootActionsType = any