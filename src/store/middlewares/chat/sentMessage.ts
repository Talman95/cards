import { createAsyncThunk } from '@reduxjs/toolkit';

import { chatAPI } from '../../../api';

export const sentMessage = createAsyncThunk('chat/sentMessage', (message: string) => {
  chatAPI.sentMessage(message);
});
