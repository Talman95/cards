import { appActions as commonActions } from './actions/appActions';
import { authAsyncThunks } from './middlewares/auth';
import { cardsAsyncThunks } from './middlewares/cards';
import { chatAsyncThunks } from './middlewares/chat';
import { learnAsyncThunks } from './middlewares/learn';
import { packsAsyncThunks } from './middlewares/packs';
import { profileAsyncThunks } from './middlewares/profile';
import { usersAsyncThunk } from './middlewares/users';
import { appSelectors } from './selectors/appSelectors';
import { authSelectors } from './selectors/authSelectors';
import { cardsSelectors } from './selectors/cardsSelectors';
import { chatSelectors } from './selectors/chatSelectors';
import { learnSelectors } from './selectors/learnSelectors';
import { modalSelectors } from './selectors/modalSelectors';
import { packsSelectors } from './selectors/packsSelectors';
import { profileSelectors } from './selectors/profileSelectors';
import { usersSelectors } from './selectors/usersSelectors';
import { authActions } from './slices/authSlice';
import { cardsActions } from './slices/cardsSlice';
import { learnActions } from './slices/learnSlice';
import { modalActions } from './slices/modalSlice';
import { packsActions } from './slices/packsSlice';
import { profileActions } from './slices/profileSlice';
import { usersActions } from './slices/usersSlice';

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

export const selectors = {
  appSelectors,
  authSelectors,
  cardsSelectors,
  chatSelectors,
  learnSelectors,
  modalSelectors,
  packsSelectors,
  profileSelectors,
  usersSelectors,
};
