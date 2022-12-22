import React, { FC } from 'react';

import { BasicModal } from '../../components/BasicModal/BasicModal';
import { useAppSelector } from '../../hooks/hooks';
import { modalWatcher } from '../../utils/modalWatcher';

export const Modals: FC = () => {
  const type = useAppSelector(state => state.modal.type);

  return (
    <BasicModal type={type}>
      <>{modalWatcher(type)}</>
    </BasicModal>
  );
};
