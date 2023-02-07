import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { authAPI, LoginParamsType, RegisterParamsType } from '../../../api';
import { LogoutType } from '../../../api/authAPI/types';
import { appStatus } from '../../../enums/appStatus';
import { SnackbarStatus } from '../../../enums/snackbarStatus';
import { ProfileType } from '../../../types';
import { handleTestAppError } from '../../../utils/handleTestError';
import { appActions } from '../../actions/appActions';
import { authActions } from '../../slices/authSlice';
import { profileActions } from '../../slices/profileSlice';
import { authAsyncThunks } from '../auth';

jest.mock('../../../api/authAPI/authAPI');
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>;

const dispatch = jest.fn();
const getState = jest.fn();

const SECOND_CALL = 2;
const THIRD_CALL = 3;
const FOURTH_CALL = 4;
const FIFTH_CALL = 5;
const SIXTH_CALL = 6;
const SEVEN_CALL = 7;

describe('auth asyncThunks', () => {
  beforeEach(() => {
    dispatch.mockClear();
    getState.mockClear();
  });

  describe('login asyncThunk', () => {
    let thunk: AsyncThunkAction<void, LoginParamsType, {}>;
    let arg: LoginParamsType;

    let result: AxiosResponse<ProfileType>;
    const loginResult = {
      avatar: '',
      created: '',
      email: '',
      isAdmin: false,
      name: '',
      publicCardPacksCount: 1,
      rememberMe: false,
      token: '',
      tokenDeathTime: 0,
      updated: '',
      verified: true,
      __v: 1,
      _id: '',
    };

    beforeEach(async () => {
      authAPIMock.login.mockClear();

      arg = { email: 'email', password: 'pass', rememberMe: true };
      result = {
        status: 200,
        data: loginResult,
        statusText: '',
        config: {},
        headers: {},
      };
    });

    it('should login with resolve response', async () => {
      authAPIMock.login.mockResolvedValue(result);

      thunk = authAsyncThunks.login(arg);

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(FIFTH_CALL);
      expect(calls[0][0].type).toBe('auth/login/pending');
      expect(dispatch).toHaveBeenNthCalledWith(
        SECOND_CALL,
        appActions.setAppStatus(appStatus.LOADING),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        THIRD_CALL,
        profileActions.setProfile({ profile: result.data }),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        FOURTH_CALL,
        appActions.setAppStatus(appStatus.IDLE),
      );
      expect(calls[FOURTH_CALL][0].type).toBe('auth/login/fulfilled');
      expect(calls[FOURTH_CALL][0].payload).toStrictEqual({ login: true });
    });

    it('should login with rejected response', async () => {
      const errorMessage = 'Something wrong';
      const error: Error | AxiosError<{ error: string }> = {
        isAxiosError: true,
        message: errorMessage,
        name: 'Error',
      };

      authAPIMock.login.mockRejectedValue(error);

      thunk = authAsyncThunks.login(arg);

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;

      handleTestAppError(calls, dispatch, errorMessage, 'login');
    });
  });

  describe('logout asyncThunk', () => {
    let thunk: AsyncThunkAction<any, void, {}>;

    let result: AxiosResponse<LogoutType>;
    const loginResult = {
      info: 'success logout',
    };

    beforeEach(async () => {
      authAPIMock.login.mockClear();

      result = {
        status: 200,
        data: loginResult,
        statusText: '',
        config: {},
        headers: {},
      };
    });

    it('should logout with resolve response', async () => {
      authAPIMock.logout.mockResolvedValue(result);

      thunk = authAsyncThunks.logout();

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(FIFTH_CALL);
      expect(calls[0][0].type).toBe('auth/logout/pending');
      expect(dispatch).toHaveBeenNthCalledWith(
        SECOND_CALL,
        appActions.setAppStatus(appStatus.LOADING),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        THIRD_CALL,
        profileActions.setProfile({ profile: null }),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        FOURTH_CALL,
        appActions.setAppStatus(appStatus.IDLE),
      );
      expect(calls[FOURTH_CALL][0].type).toBe('auth/logout/fulfilled');
      expect(calls[FOURTH_CALL][0].payload).toStrictEqual({ login: false });
    });

    it('should logout with rejected response', async () => {
      const errorMessage = 'Something wrong';
      const error: Error | AxiosError<{ error: string }> = {
        isAxiosError: true,
        message: errorMessage,
        name: 'Error',
      };

      authAPIMock.logout.mockRejectedValue(error);

      thunk = authAsyncThunks.logout();

      await thunk(dispatch, getState, undefined);

      thunk = authAsyncThunks.logout();

      const { calls } = dispatch.mock;

      handleTestAppError(calls, dispatch, errorMessage, 'logout');
    });
  });

  describe('getAuthData asyncThunk', () => {
    let thunk: AsyncThunkAction<any, void, {}>;
    let result: AxiosResponse<ProfileType>;
    const authResult = {
      avatar: '',
      created: '',
      email: '',
      isAdmin: false,
      name: '',
      publicCardPacksCount: 1,
      rememberMe: false,
      token: '',
      tokenDeathTime: 0,
      updated: '',
      verified: true,
      __v: 1,
      _id: '',
    };

    beforeEach(async () => {
      authAPIMock.authMe.mockClear();
      result = {
        status: 200,
        data: authResult,
        statusText: '',
        config: {},
        headers: {},
      };
    });

    it('should getAuthData with resolve response', async () => {
      authAPIMock.authMe.mockResolvedValue(result);

      thunk = authAsyncThunks.getAuthData();

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(SEVEN_CALL);
      expect(calls[0][0].type).toBe('auth/authMe/pending');
      expect(dispatch).toHaveBeenNthCalledWith(
        SECOND_CALL,
        appActions.setAppStatus(appStatus.LOADING),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        THIRD_CALL,
        profileActions.setProfile({ profile: result.data }),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        FOURTH_CALL,
        authActions.setLoggedIn(true),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        FIFTH_CALL,
        appActions.setInitialization(true),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        SIXTH_CALL,
        appActions.setAppStatus(appStatus.IDLE),
      );
      expect(calls[SIXTH_CALL][0].type).toBe('auth/authMe/fulfilled');
      expect(calls[SIXTH_CALL][0].payload).toStrictEqual(null);
    });

    it('should getAuthData with rejected response', async () => {
      const errorMessage = 'Not auth';
      const error: Error | AxiosError<{ error: string }> = {
        isAxiosError: true,
        message: errorMessage,
        name: 'Error',
      };

      authAPIMock.authMe.mockRejectedValue(error);

      thunk = authAsyncThunks.getAuthData();

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(FIFTH_CALL);
      expect(calls[0][0].type).toBe('auth/authMe/pending');
      expect(dispatch).toHaveBeenNthCalledWith(
        SECOND_CALL,
        appActions.setAppStatus(appStatus.LOADING),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        THIRD_CALL,
        appActions.setInitialization(true),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        FOURTH_CALL,
        appActions.setAppStatus(appStatus.FAILED),
      );
      expect(calls[FOURTH_CALL][0].type).toBe('auth/authMe/rejected');
      expect(calls[FOURTH_CALL][0].payload).toStrictEqual({ login: false });
    });
  });

  describe('register asyncThunk', () => {
    const params: RegisterParamsType = {
      email: 'email@gmail.com',
      password: '12345',
    };

    let thunk: AsyncThunkAction<any, RegisterParamsType, {}>;
    let result: AxiosResponse<{}>;

    beforeEach(async () => {
      authAPIMock.authMe.mockClear();

      result = {
        status: 200,
        data: {},
        statusText: '',
        config: {},
        headers: {},
      };
    });

    it('should register with resolve response', async () => {
      authAPIMock.register.mockResolvedValue(result);

      thunk = authAsyncThunks.register(params);

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(FIFTH_CALL);
      expect(calls[0][0].type).toBe('auth/register/pending');
      expect(dispatch).toHaveBeenNthCalledWith(
        SECOND_CALL,
        appActions.setAppStatus(appStatus.LOADING),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        THIRD_CALL,
        appActions.setAppStatus(appStatus.IDLE),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        FOURTH_CALL,
        appActions.setAppMessage({
          result: SnackbarStatus.SUCCESS,
          message: 'Registration is successful',
        }),
      );
      expect(calls[FOURTH_CALL][0].type).toBe('auth/register/fulfilled');
      expect(calls[FOURTH_CALL][0].payload).toStrictEqual({ isRegistered: true });
    });

    it('should register with rejected response', async () => {
      const errorMessage = 'Register failed';
      const error: Error | AxiosError<{ error: string }> = {
        isAxiosError: true,
        message: errorMessage,
        name: 'Error',
      };

      authAPIMock.register.mockRejectedValue(error);

      thunk = authAsyncThunks.register(params);

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;

      handleTestAppError(calls, dispatch, errorMessage, 'register');
    });
  });

  describe('sendPassword asyncThunk', () => {
    const email = 'email@gmail.com';

    let thunk: AsyncThunkAction<any, string, {}>;
    let result: AxiosResponse<{}>;

    beforeEach(async () => {
      authAPIMock.sendPassword.mockClear();

      result = {
        status: 200,
        data: {},
        statusText: '',
        config: {},
        headers: {},
      };
    });

    it('should sendPassword with resolve response', async () => {
      authAPIMock.sendPassword.mockResolvedValue(result);

      thunk = authAsyncThunks.sendPassword(email);

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(FIFTH_CALL);
      expect(calls[0][0].type).toBe('auth/sendPassword/pending');
      expect(dispatch).toHaveBeenNthCalledWith(
        SECOND_CALL,
        appActions.setAppStatus(appStatus.LOADING),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        THIRD_CALL,
        appActions.setAppStatus(appStatus.IDLE),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        FOURTH_CALL,
        appActions.setAppMessage({
          result: SnackbarStatus.SUCCESS,
          message: 'Message has been sent successfully',
        }),
      );
      expect(calls[FOURTH_CALL][0].type).toBe('auth/sendPassword/fulfilled');
      expect(calls[FOURTH_CALL][0].payload).toStrictEqual(null);
    });

    it('should sendPassword with rejected response', async () => {
      const errorMessage = 'Send password failed';
      const error: Error | AxiosError<{ error: string }> = {
        isAxiosError: true,
        message: errorMessage,
        name: 'Error',
      };

      authAPIMock.sendPassword.mockRejectedValue(error);

      thunk = authAsyncThunks.sendPassword(email);

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;

      handleTestAppError(calls, dispatch, errorMessage, 'sendPassword');
    });
  });

  describe('setNewPassword asyncThunk', () => {
    type ParamType = {
      password: string;
      token: string | undefined;
    };

    const param: ParamType = {
      password: '123qweASD',
      token: '0987654321',
    };

    let thunk: AsyncThunkAction<any, ParamType, {}>;
    let result: AxiosResponse<{}>;

    beforeEach(async () => {
      authAPIMock.setNewPassword.mockClear();

      result = {
        status: 200,
        data: {},
        statusText: '',
        config: {},
        headers: {},
      };
    });

    it('should setNewPassword with resolve response', async () => {
      authAPIMock.setNewPassword.mockResolvedValue(result);

      thunk = authAsyncThunks.setNewPassword(param);

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(FIFTH_CALL);
      expect(calls[0][0].type).toBe('auth/setNewPassword/pending');
      expect(dispatch).toHaveBeenNthCalledWith(
        SECOND_CALL,
        appActions.setAppStatus(appStatus.LOADING),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        THIRD_CALL,
        appActions.setAppStatus(appStatus.IDLE),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        FOURTH_CALL,
        appActions.setAppMessage({
          result: SnackbarStatus.SUCCESS,
          message: 'Password has been changed successfully',
        }),
      );
      expect(calls[FOURTH_CALL][0].type).toBe('auth/setNewPassword/fulfilled');
      expect(calls[FOURTH_CALL][0].payload).toStrictEqual(null);
    });

    it('should setNewPassword with rejected response', async () => {
      const errorMessage = 'Change password failed';
      const error: Error | AxiosError<{ error: string }> = {
        isAxiosError: true,
        message: errorMessage,
        name: 'Error',
      };

      authAPIMock.setNewPassword.mockRejectedValue(error);

      thunk = authAsyncThunks.setNewPassword(param);

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;

      handleTestAppError(calls, dispatch, errorMessage, 'setNewPassword');
    });
  });
});
