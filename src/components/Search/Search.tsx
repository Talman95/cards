import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import { TextField } from '@mui/material';

import { useDebounce } from '../../hooks/useDebounce';

const DELAY = 500;

type SearchType = {
  title: string;
  setTitle: (title: string) => void;
};

export const Search: FC<SearchType> = ({ title, setTitle }) => {
  const [searchTerm, setSearchTerm] = useState(title);

  const changeSearchTermHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setSearchTerm(e.currentTarget.value);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, DELAY);

  useEffect(() => {
    setSearchTerm(title);
  }, [title]);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    setTitle(searchTerm);
  }, [debouncedSearchTerm]);

  return (
    <TextField
      size="small"
      value={searchTerm}
      onChange={changeSearchTermHandler}
      fullWidth
    />
  );
};
