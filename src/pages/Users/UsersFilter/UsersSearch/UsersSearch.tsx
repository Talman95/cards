import React from 'react';
import {Search} from "../../../../components/Search/Search";
import {Box, Typography} from "@mui/material";
import {useActions} from "../../../../hooks/useActions";
import {useAppSelector} from "../../../../hooks/hooks";

export const UsersSearch = () => {
    const {setSearchUserName} = useActions()

    const userName = useAppSelector(state => state.users.filter.userName)

    return (
        <Box style={{height: '62px', width: '300px'}}>
            <Typography variant={'body2'}>Search user</Typography>
            <Search title={userName} setTitle={setSearchUserName}/>
        </Box>
    )
}