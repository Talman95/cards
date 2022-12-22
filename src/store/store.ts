import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { appSlice } from './slices/appSlice';
import { authSlice } from './slices/authSlice';
import { cardsSlice } from './slices/cardsSlice';
import { chatSlice } from './slices/chatSlice';
import { learnSlice } from './slices/learnSlice';
import { modalSlice } from './slices/modalSlice';
import { packsSlice } from './slices/packsSlice';
import { profileSlice } from './slices/profileSlice';
import { usersSlice } from './slices/usersSlice';

const rootReducers = combineReducers({
  auth: authSlice,
  app: appSlice,
  profile: profileSlice,
  packs: packsSlice,
  cards: cardsSlice,
  learn: learnSlice,
  users: usersSlice,
  chat: chatSlice,
  modal: modalSlice,
});

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
