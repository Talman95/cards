import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { appActions } from '../../actions/appActions';
import { authActions } from '../../slices/authSlice';
import { profileActions } from '../../slices/profileSlice';

const { setProfile } = profileActions;
const { setAppStatus, setInitialization } = appActions;

export const getAuthData = createAsyncThunk(
  'auth/authMe',
  async (param: undefined, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    try {
      const res = await authAPI.authMe();

      thunkAPI.dispatch(setProfile({ profile: res.data }));
      thunkAPI.dispatch(authActions.setLoggedIn(true));
      thunkAPI.dispatch(setInitialization(true));
      thunkAPI.dispatch(setAppStatus(appStatus.IDLE));

      return null;
    } catch {
      thunkAPI.dispatch(setInitialization(true));
      thunkAPI.dispatch(setAppStatus(appStatus.FAILED));

      return thunkAPI.rejectWithValue({ login: false });
    }
  },
);
