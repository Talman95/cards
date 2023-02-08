import { appStatus } from '../../../enums/appStatus';
import { SnackbarStatus } from '../../../enums/snackbarStatus';
import { appActions as commonActions } from '../../actions/appActions';
import { appSlice } from '../appSlice';

describe('appSlice', () => {
  let initialState: {
    isInitialized: boolean;
    status: appStatus;
    error: string | null;
    message: string | null;
    result: SnackbarStatus;
  };

  beforeEach(() => {
    initialState = {
      isInitialized: false,
      status: appStatus.IDLE,
      error: null,
      message: null,
      result: SnackbarStatus.SUCCESS,
    };
  });

  it('should return default state when we pass empty action', () => {
    const result = appSlice(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('should change status with "setAppStatus" action', () => {
    const action = {
      type: commonActions.setAppStatus.type,
      payload: appStatus.IDLE,
    };

    const state = appSlice(initialState, action);

    expect(state.status).toBe(appStatus.IDLE);
  });

  it('should change message and result with "setAppMessage" action', () => {
    const errorMessage = 'error message';

    const action = {
      type: commonActions.setAppMessage.type,
      payload: { result: SnackbarStatus.ERROR, message: errorMessage },
    };

    const state = appSlice(initialState, action);

    expect(state.result).toBe(SnackbarStatus.ERROR);
    expect(state.message).toBe(errorMessage);
  });

  it('should change isInitialized with "setInitialization" action', () => {
    const action = {
      type: commonActions.setInitialization.type,
      payload: true,
    };

    const state = appSlice(initialState, action);

    expect(state.isInitialized).toBe(true);
  });
});
