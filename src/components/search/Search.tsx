import React, {ChangeEvent, FC, memo, useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import {useDebounce} from "../../hooks/useDebounce";

type SearchType = {
    title: string
    setTitle: (title: string) => void
}

export const Search: FC<SearchType> = memo(({title, setTitle}) => {
    console.log('Search')
    const [searchTerm, setSearchTerm] = useState(title)

    const changeSearchTermHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.currentTarget.value)
    }
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    useEffect(() => {
        setSearchTerm(title)
    }, [title])

    useEffect(() => {
        setTitle(searchTerm)
    }, [debouncedSearchTerm])

    return (
        <TextField
            size={'small'}
            value={searchTerm}
            onChange={changeSearchTermHandler}
            fullWidth
        />
    );
})