import {combineReducers} from "redux";
import {authReducer} from "../../c2-features/f1-auth/a1-login/l2-bll/authReducer";
import {profileReducer} from "../../c2-features/f1-auth/a3-profile/p2-bll/profileReducer";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appReducer";
import {packsReducer} from "../../c2-features/f2-packs/p2-bll/packsReducer";
import {cardsReducer} from "../../c2-features/f3-cards/c2-bll/cardsReducer";
import {learnReducer} from "../../c2-features/f4-learn/l2-bll/learnReducer";

const rootReducers = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learn: learnReducer,
})

export const store = configureStore({
    reducer: rootReducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch