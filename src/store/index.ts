import {appActions as commonActions} from "./CommonActions/App";
import {authActions} from "./Auth/authSlice";
import {authAsyncThunks} from "./Auth/asyncThunk";
import {cardsAsyncThunks} from "./Cards/asyncThunk";
import {cardsActions} from "./Cards/cardsSlice";
import {learnActions} from "./Learn/learnSlice";
import {learnAsyncThunks} from "./Learn/asyncThunk";
import {profileActions} from "./Profile/profileSlice";
import {profileAsyncThunks} from "./Profile/asyncThunk";
import {packsActions} from "./Packs/packsSlice";
import {packsAsyncThunks} from "./Packs/asyncThunk";
import {usersAsyncThunk} from "./Users/asyncThunk";
import {usersActions} from "./Users/usersSlice";
import {chatAsyncThunks} from "./Chat/asyncThunk";


export const appActions = {
    ...commonActions,
}
export const allAuthActions = {
    ...authActions,
    ...authAsyncThunks,
}
export const allPacksActions = {
    ...packsActions,
    ...packsAsyncThunks,
}
export const allCardsActions = {
    ...cardsActions,
    ...cardsAsyncThunks,
}
export const allLearnActions = {
    ...learnActions,
    ...learnAsyncThunks,
}
export const allProfileActions = {
    ...profileActions,
    ...profileAsyncThunks,
}
export const allUsersActions = {
    ...usersActions,
    ...usersAsyncThunk,
}
export const allChatActions = {
    // ...usersActions,
    ...chatAsyncThunks,
}