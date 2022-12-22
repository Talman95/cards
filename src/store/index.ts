import { authAsyncThunks } from './Auth/asyncThunk';
import { authActions } from './Auth/authSlice';
import { cardsAsyncThunks } from './Cards/asyncThunk';
import { cardsActions } from './Cards/cardsSlice';
import { chatAsyncThunks } from './Chat/asyncThunk';
import { appActions as commonActions } from './CommonActions/App';
import { learnAsyncThunks } from './Learn/asyncThunk';
import { learnActions } from './Learn/learnSlice';
import { modalActions } from './Modal/modalSlice';
import { packsAsyncThunks } from './Packs/asyncThunk';
import { packsActions } from './Packs/packsSlice';
import { profileAsyncThunks } from './Profile/asyncThunk';
import { profileActions } from './Profile/profileSlice';
import { usersAsyncThunk } from './Users/asyncThunk';
import { usersActions } from './Users/usersSlice';

export const appActions = {
  ...commonActions,
};
export const allAuthActions = {
  ...authActions,
  ...authAsyncThunks,
};
export const allPacksActions = {
  ...packsActions,
  ...packsAsyncThunks,
};
export const allCardsActions = {
  ...cardsActions,
  ...cardsAsyncThunks,
};
export const allLearnActions = {
  ...learnActions,
  ...learnAsyncThunks,
};
export const allProfileActions = {
  ...profileActions,
  ...profileAsyncThunks,
};
export const allUsersActions = {
  ...usersActions,
  ...usersAsyncThunk,
};
export const allChatActions = {
  // ...usersActions,
  ...chatAsyncThunks,
};
export const allModalActions = {
  ...modalActions,
};
