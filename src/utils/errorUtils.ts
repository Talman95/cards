import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { appStatus } from '../enums/appStatus';
import { SnackbarStatus } from '../enums/snackbarStatus';
import { appActions } from '../store/actions/appActions';

const { setAppStatus, setAppMessage } = appActions;

type DispatchType = Dispatch<
  ReturnType<typeof setAppStatus> | ReturnType<typeof setAppMessage>
>;
type ThunkAPIType = {
  dispatch: DispatchType;
  rejectWithValue: Function;
};

export const handleAppError = (e: any, thunkAPI: ThunkAPIType): any => {
  const err = e as Error | AxiosError<{ error: string }>;

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message;

    thunkAPI.dispatch(setAppMessage({ result: SnackbarStatus.ERROR, message: error }));
    thunkAPI.dispatch(setAppStatus(appStatus.FAILED));

    return thunkAPI.rejectWithValue({ error });
  }
  thunkAPI.dispatch(
    setAppMessage({
      result: SnackbarStatus.ERROR,
      message: `Native error ${err.message}`,
    }),
  );
  thunkAPI.dispatch(setAppStatus(appStatus.FAILED));

  return thunkAPI.rejectWithValue({ error: `Native error ${err.message}` });
};
