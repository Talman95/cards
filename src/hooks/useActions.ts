import { bindActionCreators } from '@reduxjs/toolkit';

import {
  allAuthActions,
  allCardsActions,
  allChatActions,
  allLearnActions,
  allModalActions,
  allPacksActions,
  allProfileActions,
  allUsersActions,
  appActions,
} from '../store';

import { useAppDispatch } from './useAppDispatch';

const allActions = {
  ...appActions,
  ...allAuthActions,
  ...allPacksActions,
  ...allCardsActions,
  ...allLearnActions,
  ...allProfileActions,
  ...allUsersActions,
  ...allChatActions,
  ...allModalActions,
};

export const useActions = (): any => {
  const dispatch = useAppDispatch();

  return bindActionCreators(allActions, dispatch);
};
