import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';

import { useAppDispatch } from './useAppDispatch';

export const useActions = (actions: ActionCreatorsMapObject): any => {
  const dispatch = useAppDispatch();

  return bindActionCreators(actions, dispatch);
};
