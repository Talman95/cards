import { appStatus } from '../enums/appStatus';
import { SnackbarStatus } from '../enums/snackbarStatus';
import { appActions } from '../store/actions/appActions';

export function handleTestAppError(
  calls: any[],
  dispatch: jest.Mock,
  errorMessage: string,
  sliceName: string,
  thunkName: string,
): void {
  /* eslint-disable no-magic-numbers */
  expect(calls).toHaveLength(5);

  expect(calls[0][0].type).toBe(`${sliceName}/${thunkName}/pending`);

  expect(dispatch).toHaveBeenNthCalledWith(2, appActions.setAppStatus(appStatus.LOADING));
  expect(dispatch).toHaveBeenNthCalledWith(
    3,
    appActions.setAppMessage({ result: SnackbarStatus.ERROR, message: errorMessage }),
  );
  expect(dispatch).toHaveBeenNthCalledWith(4, appActions.setAppStatus(appStatus.FAILED));
  expect(calls[4][0].type).toBe(`auth/${thunkName}/rejected`);
  expect(calls[4][0].payload).toStrictEqual({ error: errorMessage });
}
