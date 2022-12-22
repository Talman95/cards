import { createAsyncThunk } from '@reduxjs/toolkit';

import { chatAPI } from '../../../api';

export const destroyConnection = createAsyncThunk('chat/destroyConnection', () => {
  chatAPI.destroyConnection();
});
