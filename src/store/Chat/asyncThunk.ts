import { createAsyncThunk } from '@reduxjs/toolkit';

import { chatAPI } from '../../api/chatAPI';
import { RootState } from '../store';

import { chatActions } from './chatSlice';

const { initMessagesHandler, newMessageSendHandler } = chatActions;

export const createConnection = createAsyncThunk(
  'chat/createConnection',
  // eslint-disable-next-line no-shadow-restricted-names
  (undefined: undefined, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (state.profile.profile) {
      const { _id, name } = state.profile.profile;

      chatAPI.createConnection(_id, name, null);
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

export const sentMessage = createAsyncThunk('chat/sentMessage', (message: string) => {
  chatAPI.sentMessage(message);
});

export const destroyConnection = createAsyncThunk('chat/destroyConnection', () => {
  chatAPI.destroyConnection();
});

export const chatAsyncThunks = {
  createConnection,
  sentMessage,
  destroyConnection,
};
