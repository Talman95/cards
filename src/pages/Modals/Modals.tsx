import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import { BasicModal } from '../../components/BasicModal/BasicModal';
import { selectors } from '../../store';
import { modalWatcher } from '../../utils/modalWatcher';

export const Modals: FC = () => {
  const type = useSelector(selectors.modalSelectors.selectType);

  return (
    <BasicModal type={type}>
      <>{modalWatcher(type)}</>
    </BasicModal>
  );
};
