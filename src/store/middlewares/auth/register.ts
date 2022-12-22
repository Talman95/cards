import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, RegisterParamsType } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { SnackbarStatus } from '../../../enums/snackbarStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';

const { setAppStatus, setAppMessage } = appActions;

export const register = createAsyncThunk(
  'auth/register',
  async (params: RegisterParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    try {
      await authAPI.register(params);
      thunkAPI.dispatch(setAppStatus(appStatus.IDLE));
      thunkAPI.dispatch(
        setAppMessage({
          result: SnackbarStatus.SUCCESS,
          message: 'Registration is successful',
        }),
      );

      return { isRegistered: true };
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);
