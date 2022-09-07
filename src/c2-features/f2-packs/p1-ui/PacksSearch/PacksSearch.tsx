import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Box, IconButton, InputBase, Paper, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";
import {setPackName} from "../../p2-bll/packsReducer";
import SearchIcon from '@mui/icons-material/Search';
import {useDebounce} from "../../../../c0-common/c1-hooks/useDebounce";

export const PacksSearch: FC = () => {
    const dispatch = useAppDispatch()
    const packName = useAppSelector(state => state.packs.packName)
    const [searchTerm, setSearchTerm] = useState(packName)

    const changeSearchTermHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.currentTarget.value)
    }
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    useEffect(() => {
            dispatch(setPackName(searchTerm))
        }, [debouncedSearchTerm]
    )

    return (
        <Box>
            <Typography variant={'body2'}>Search</Typography>
            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 300}}
            >
                <IconButton sx={{p: '10px'}} aria-label="menu">
                    <SearchIcon/>
                </IconButton>
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Search ..."
                    inputProps={{'aria-label': 'search name'}}
                    size={'small'}
                    value={searchTerm}
                    onChange={changeSearchTermHandler}
                />
            </Paper>
        </Box>
    );
};