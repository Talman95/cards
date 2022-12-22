import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';
import { profileActions } from '../../slices/profileSlice';

const { setProfile } = profileActions;
const { setAppStatus } = appActions;

export const logout = createAsyncThunk(
  'auth/logout',
  async (param: undefined, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    try {
      await authAPI.logout();
      thunkAPI.dispatch(setProfile({ profile: null }));
      thunkAPI.dispatch(setAppStatus(appStatus.IDLE));

      return { login: false };
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);
