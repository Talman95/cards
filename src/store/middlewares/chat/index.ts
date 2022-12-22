import { createConnection } from './createConnection';
import { destroyConnection } from './destroyConnection';
import { sentMessage } from './sentMessage';

export const chatAsyncThunks = {
  createConnection,
  sentMessage,
  destroyConnection,
};
