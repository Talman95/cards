import React from 'react';
import {Box} from "@mui/material";
import {Search} from "../../../components/Search/Search";
import {useAppSelector} from "../../../hooks/hooks";
import {useActions} from "../../../hooks/useActions";

export const UsersFilter = () => {
    const {setSearchUserName} = useActions()

    const userName = useAppSelector(state => state.users.filter.userName)

    return (
        <Box style={{display: 'flex', alignItems: 'center'}}>
            <Search title={userName} setTitle={setSearchUserName}/>
        </Box>
    )
}