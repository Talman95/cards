import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { login } from '../middlewares/auth/login';
import { logout } from '../middlewares/auth/logout';
import { register } from '../middlewares/auth/register';

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isRegistered: false,
  },
  reducers: {
    setRegister: (state, action: PayloadAction<boolean>) => {
      state.isRegistered = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.login;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.login;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isRegistered = action.payload.isRegistered;
    });
  },
});

export const authSlice = slice.reducer;
export const authActions = slice.actions;
