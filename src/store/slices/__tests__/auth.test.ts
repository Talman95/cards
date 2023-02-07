import { login } from '../../middlewares/auth/login';
import { logout } from '../../middlewares/auth/logout';
import { register } from '../../middlewares/auth/register';
import { authActions, authSlice } from '../authSlice';

describe('authSlice', () => {
  let initialState: {
    isLoggedIn: boolean;
    isRegistered: boolean;
  };

  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
      isRegistered: false,
    };
  });

  it('should return default state when we pass empty action', () => {
    const result = authSlice(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('registration should be completed', () => {
    const action = authActions.setRegister(true);
    const result = authSlice(initialState, action);

    expect(result.isRegistered).toBeTruthy();
  });

  it('login should be completed', () => {
    const action = authActions.setLoggedIn(true);
    const result = authSlice(initialState, action);

    expect(result.isLoggedIn).toBeTruthy();
  });

  it('should change isLoggedIn with "login.fulfilled" action', () => {
    const action = {
      type: login.fulfilled.type,
      payload: { login: true },
    };

    const state = authSlice(initialState, action);

    expect(state.isLoggedIn).toBe(true);
  });

  it('should change isLoggedIn with "logout.fulfilled" action', () => {
    const action = {
      type: logout.fulfilled.type,
      payload: { login: false },
    };

    const state = authSlice(initialState, action);

    expect(state.isLoggedIn).toBe(false);
  });

  it('should change isRegistered with "register.fulfilled" action', () => {
    const action = {
      type: register.fulfilled.type,
      payload: { isRegistered: true },
    };

    const state = authSlice(initialState, action);

    expect(state.isRegistered).toBe(true);
  });
});
