import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {UsersTable} from "./UsersTable/UsersTable";
import {UsersHeader} from "./UsersHeader/UsersHeader";
import {useActions} from "../../hooks/useActions";
import {useAppSelector} from "../../hooks/hooks";
import {UsersFilter} from "./UsersFilter/UsersFilter";

export const Users = () => {
    const {getUsers} = useActions()

    const filter = useAppSelector(state => state.users.filter)

    useEffect(() => {
        getUsers()
    }, [filter])

    return (
        <Box>
            <UsersHeader/>
            <UsersFilter/>
            <UsersTable/>
        </Box>
    )
}