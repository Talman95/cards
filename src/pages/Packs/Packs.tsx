import React, { FC, useEffect } from 'react';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useActions } from '../../hooks/useActions';
import { selectors } from '../../store';

import { FilterBlock } from './FilterBlock/FilterBlock';
import { PackListHeader } from './PackListHeader/PackListHeader';
import { TableBlock } from './TableBlock/TableBlock';

export const Packs: FC = () => {
  const { getPacks, setParamUserId, setCurrentPage } = useActions();

  const [searchParams, setSearchParams] = useSearchParams();

  const filter = useSelector(selectors.packsSelectors.selectFilter);
  const page = useSelector(selectors.packsSelectors.selectPage);
  const pageCount = useSelector(selectors.packsSelectors.selectPageCount);
  const userId = useSelector(selectors.profileSelectors.selectProfile)?._id;

  useEffect(() => {
    const paramId = searchParams.get('id');

    setParamUserId(paramId);
    getPacks(paramId);
  }, [filter, page, pageCount, searchParams]);

  const onMyPacksClick = (): void => {
    if (!userId) return;

    setSearchParams({ id: userId });
    setCurrentPage(1);
  };
  const onAllPacksClick = (): void => {
    searchParams.delete('id');
    setSearchParams(searchParams);
    setCurrentPage(1);
  };

  return (
    <Box>
      <PackListHeader />
      <FilterBlock onAllPacksClick={onAllPacksClick} onMyPacksClick={onMyPacksClick} />
      <TableBlock />
    </Box>
  );
};
