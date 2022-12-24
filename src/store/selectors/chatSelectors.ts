import { MessageType } from '../../types';
import { RootState } from '../store';

export const chatSelectors = {
  selectMessages: (state: RootState): MessageType[] => state.chat.messages,
};
