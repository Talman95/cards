import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { SnackbarStatus } from '../../../enums/snackbarStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';

const { setAppStatus, setAppMessage } = appActions;

export const setNewPassword = createAsyncThunk<
  null,
  { password: string; token: string | undefined },
  {
    rejectValue: { error: string };
  }
>(
  'auth/setNewPassword',
  async (param: { password: string; token: string | undefined }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    try {
      await authAPI.setNewPassword(param.password, param.token);
      thunkAPI.dispatch(setAppStatus(appStatus.IDLE));
      thunkAPI.dispatch(
        setAppMessage({
          result: SnackbarStatus.SUCCESS,
          message: 'Password has been changed successfully',
        }),
      );

      return null;
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);
