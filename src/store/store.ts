import {combineReducers} from "redux";
import {authSlice} from "./Auth/authSlice";
import {profileSlice} from "./Profile/profileSlice";
import {configureStore} from "@reduxjs/toolkit";
import {appSlice} from "./App/appSlice";
import {packsSlice} from "./Packs/packsSlice";
import {cardsSlice} from "./Cards/cardsSlice";
import {learnSlice} from "./Learn/learnSlice";
import {usersSlice} from "./Users/usersSlice";
import {chatSlice} from "./Chat/chatSlice";
import {modalSlice} from "./Modal/modalSlice";

const rootReducers = combineReducers({
    app: appSlice,
    auth: authSlice,
    profile: profileSlice,
    packs: packsSlice,
    cards: cardsSlice,
    learn: learnSlice,
    users: usersSlice,
    chat: chatSlice,
    modal: modalSlice,
})

export const store = configureStore({
    reducer: rootReducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch