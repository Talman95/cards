import { ModalDateType } from '../slices/modalSlice';
import { RootState } from '../store';

export const modalSelectors = {
  selectType: (state: RootState): string | null => state.modal.type,
  selectData: (state: RootState): ModalDateType | null => state.modal.data,
  selectIsFetch: (state: RootState): boolean => state.modal.isFetch,
};
