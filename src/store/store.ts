import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { appSlice } from './App/appSlice';
import { authSlice } from './Auth/authSlice';
import { cardsSlice } from './Cards/cardsSlice';
import { chatSlice } from './Chat/chatSlice';
import { learnSlice } from './Learn/learnSlice';
import { modalSlice } from './Modal/modalSlice';
import { packsSlice } from './Packs/packsSlice';
import { profileSlice } from './Profile/profileSlice';
import { usersSlice } from './Users/usersSlice';

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
