import { appActions as commonActions } from './actions/appActions';
import { authAsyncThunks } from './middlewares/auth';
import { cardsAsyncThunks } from './middlewares/cards';
import { chatAsyncThunks } from './middlewares/chat';
import { learnAsyncThunks } from './middlewares/learn';
import { packsAsyncThunks } from './middlewares/packs';
import { profileAsyncThunks } from './middlewares/profile';
import { usersAsyncThunk } from './middlewares/users';
import { authActions } from './slices/authSlice';
import { cardsActions } from './slices/cardsSlice';
import { learnActions } from './slices/learnSlice';
import { modalActions } from './slices/modalSlice';
import { packsActions } from './slices/packsSlice';
import { profileActions } from './slices/profileSlice';
import { usersActions } from './slices/usersSlice';

export * from './selectors/appSelectors';
export * from './selectors/authSelectors';
export * from './selectors/cardsSelectors';
export * from './selectors/chatSelectors';
export * from './selectors/learnSelectors';
export * from './selectors/modalSelectors';
export * from './selectors/packsSelectors';
export * from './selectors/profileSelectors';
export * from './selectors/usersSelectors';

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
  ...chatAsyncThunks,
};
export const allModalActions = {
  ...modalActions,
};
