import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, LoginParamsType, RegisterParamsType } from '../../api/authAPI';
import { appStatus } from '../../enums/appStatus';
import { SnackbarStatus } from '../../enums/snackbarStatus';
import { handleAppError } from '../../utils/errorUtils';
import { appActions } from '../CommonActions/App';
import { profileActions } from '../Profile/profileSlice';

import { authActions } from './authSlice';

const { setProfile } = profileActions;
const { setAppStatus, setAppMessage, setInitialization } = appActions;

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

export const authAsyncThunks = {
  login,
  getAuthData,
  logout,
  register,
  sendPassword,
  setNewPassword,
};
