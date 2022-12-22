import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { SnackbarStatus } from '../../../enums/snackbarStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';

const { setAppStatus, setAppMessage } = appActions;

export const sendPassword = createAsyncThunk<
  null,
  string,
  {
    rejectValue: { error: string };
  }
>('auth/sendPassword', async (email, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
  try {
    await authAPI.sendPassword(email);
    thunkAPI.dispatch(setAppStatus(appStatus.IDLE));
    thunkAPI.dispatch(
      setAppMessage({
        result: SnackbarStatus.SUCCESS,
        message: 'Message has been sent successfully',
      }),
    );

    return null;
  } catch (e) {
    return handleAppError(e, thunkAPI);
  }
});
