import { createAsyncThunk } from '@reduxjs/toolkit';

import { AddCardType, cardsAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { SnackbarStatus } from '../../../enums/snackbarStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';
import { cardsActions } from '../../slices/cardsSlice';

import { getCards } from './getCards';

const { setAppStatus, setAppMessage } = appActions;

export const addCard = createAsyncThunk(
  'cards/addCards',
  async (card: AddCardType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    thunkAPI.dispatch(cardsActions.setCardsLoad(true));
    try {
      await cardsAPI.addCard(card);
      await thunkAPI.dispatch(getCards(card.cardsPack_id));
      thunkAPI.dispatch(
        setAppMessage({ result: SnackbarStatus.SUCCESS, message: 'New card created' }),
      );
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);
