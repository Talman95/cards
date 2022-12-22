import { createAsyncThunk } from '@reduxjs/toolkit';

import { cardsAPI, UpdateCardType } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { SnackbarStatus } from '../../../enums/snackbarStatus';
import { appActions } from '../../actions/appActions';
import { cardsActions } from '../../slices/cardsSlice';
import { RootState } from '../../store';

import { getCards } from './getCards';

const { setAppStatus, setAppMessage } = appActions;

export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async (card: UpdateCardType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    thunkAPI.dispatch(cardsActions.setCardsLoad(true));
    try {
      await cardsAPI.updateCard(card);

      const state = thunkAPI.getState() as RootState;
      const packId = state.cards.cardsPack_id;

      if (packId) {
        await thunkAPI.dispatch(getCards(packId));
        thunkAPI.dispatch(
          setAppMessage({ result: SnackbarStatus.SUCCESS, message: 'Card updated' }),
        );
      }
    } catch {
      return thunkAPI.rejectWithValue(null);
    }
  },
);
