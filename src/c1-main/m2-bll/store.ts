import {combineReducers, createStore} from "redux";
import {loginReducer} from "../../c2-features/f1-auth/a1-login/l2-bll/loginReducer";
import {registerReducer} from "../../c2-features/f1-auth/a2-register/r2-bll/registerReducer";
import {profileReducer} from "../../c2-features/f1-auth/a3-profile/p2-bll/profileReducer";
import {forgotReducer} from "../../c2-features/f1-auth/a4-forgot/f2-bll/forgotReducer";
import {setPassReducer} from "../../c2-features/f1-auth/a5-setPass/s2-bll/setPassReducer";

const rootReducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    forgot: forgotReducer,
    setPass: setPassReducer,
})

export const store = createStore(rootReducers)

export type RootStateType = ReturnType<typeof rootReducers>

export type RootActionsType = any