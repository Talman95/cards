import { createAsyncThunk } from '@reduxjs/toolkit';

import { cardsAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { SnackbarStatus } from '../../../enums/snackbarStatus';
import { appActions } from '../../actions/appActions';
import { cardsActions } from '../../slices/cardsSlice';
import { RootState } from '../../store';

import { getCards } from './getCards';

const { setAppStatus, setAppMessage } = appActions;

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    thunkAPI.dispatch(cardsActions.setCardsLoad(true));
    try {
      await cardsAPI.deleteCard(id);

      const state = thunkAPI.getState() as RootState;
      const packId = state.cards.cardsPack_id;

      if (packId) {
        await thunkAPI.dispatch(getCards(packId));
        thunkAPI.dispatch(
          setAppMessage({ result: SnackbarStatus.SUCCESS, message: 'Card deleted' }),
        );
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);
