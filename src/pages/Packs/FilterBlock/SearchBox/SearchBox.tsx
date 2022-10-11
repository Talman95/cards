import React from 'react';
import {useActions} from "../../../../hooks/useActions";
import {useAppSelector} from "../../../../hooks/hooks";
import {Box, Typography} from "@mui/material";
import {Search} from "../../../../components/search/Search";

export const SearchBox = () => {
    const {setPackName} = useActions()

    const packName = useAppSelector(state => state.packs.filter.packName)

    const setSearchName = (searchName: string) => {
        setPackName(searchName)
    }

    return (
        <Box style={{height: '62px', width: '300px'}}>
            <Typography variant={'body2'}>Search</Typography>
            <Search
                title={packName}
                setTitle={setSearchName}
            />
        </Box>
    )
}