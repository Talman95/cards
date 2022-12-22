import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, LoginParamsType } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';
import { profileActions } from '../../slices/profileSlice';

const { setAppStatus } = appActions;
const { setProfile } = profileActions;

export const login = createAsyncThunk(
  'auth/login',
  async (params: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    try {
      const res = await authAPI.login(params);

      thunkAPI.dispatch(setProfile({ profile: res.data }));
      thunkAPI.dispatch(setAppStatus(appStatus.IDLE));

      return { login: true };
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);
