import React, { FC, useEffect } from 'react';

import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hooks';
import { useActions } from '../../hooks/useActions';

import { FilterBlock } from './FilterBlock/FilterBlock';
import { PackListHeader } from './PackListHeader/PackListHeader';
import { TableBlock } from './TableBlock/TableBlock';

export const Packs: FC = () => {
  const { getPacks, setParamUserId, setCurrentPage } = useActions();

  const [searchParams, setSearchParams] = useSearchParams();

  const filter = useAppSelector(state => state.packs.filter);
  const page = useAppSelector(state => state.packs.page);
  const pageCount = useAppSelector(state => state.packs.pageCount);
  const userId = useAppSelector(state => state.profile.profile?._id);

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
