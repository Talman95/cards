import { createAsyncThunk } from '@reduxjs/toolkit';

import { chatAPI } from '../../../api';
import { chatActions } from '../../slices/chatSlice';
import { RootState } from '../../store';

const { initMessagesHandler, newMessageSendHandler } = chatActions;

export const createConnection = createAsyncThunk(
  'chat/createConnection',
  (_, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (state.profile.profile) {
      const { _id, name, avatar } = state.profile.profile;

      chatAPI.createConnection(_id, name, avatar);
      chatAPI.subscribe(
        messages => {
          dispatch(initMessagesHandler(messages));
        },
        message => {
          dispatch(newMessageSendHandler(message));
        },
      );
    }
  },
);
