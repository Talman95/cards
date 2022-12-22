import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MessageType } from '../../types';

const slice = createSlice({
  name: 'chat',
  initialState: {
    messages: [] as MessageType[],
  },
  reducers: {
    initMessagesHandler(state, action: PayloadAction<MessageType[]>) {
      state.messages = action.payload;
    },
    newMessageSendHandler(state, action: PayloadAction<MessageType>) {
      state.messages.push(action.payload);
    },
  },
});

export const chatSlice = slice.reducer;
export const chatActions = slice.actions;
