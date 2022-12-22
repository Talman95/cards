import { createSlice } from '@reduxjs/toolkit';

import { appStatus } from '../../enums/appStatus';
import { SnackbarStatus } from '../../enums/snackbarStatus';
import { appActions as commonActions } from '../actions/appActions';

const slice = createSlice({
  name: 'app',
  initialState: {
    isInitialized: false,
    status: appStatus.IDLE,
    error: null as string | null,
    message: null as string | null,
    result: SnackbarStatus.SUCCESS as SnackbarStatus,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(commonActions.setAppStatus, (state, action) => {
        state.status = action.payload;
      })
      .addCase(commonActions.setAppMessage, (state, action) => {
        state.message = action.payload.message;
        state.result = action.payload.result;
      })
      .addCase(commonActions.setInitialization, (state, action) => {
        state.isInitialized = action.payload;
      });
  },
});

export const appSlice = slice.reducer;
