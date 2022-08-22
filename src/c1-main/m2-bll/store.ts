import {combineReducers} from "redux";
import {authReducer} from "../../c2-features/f1-auth/a1-login/l2-bll/authReducer";
import {registerReducer} from "../../c2-features/f1-auth/a2-register/r2-bll/registerReducer";
import {profileReducer} from "../../c2-features/f1-auth/a3-profile/p2-bll/profileReducer";
import {forgotReducer} from "../../c2-features/f1-auth/a4-forgot/f2-bll/forgotReducer";
import {setPassReducer} from "../../c2-features/f1-auth/a5-setPass/s2-bll/setPassReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducers = combineReducers({
    login: authReducer,
    register: registerReducer,
    profile: profileReducer,
    forgot: forgotReducer,
    setPass: setPassReducer,
})

export const store = configureStore({
    reducer: rootReducers
})

export type RootStateType = ReturnType<typeof rootReducers>

export type RootActionsType = any