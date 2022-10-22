import React from 'react';
import {Box} from "@mui/material";
import {UsersTable} from "./UsersTable/UsersTable";
import {UsersHeader} from "./UsersHeader/UsersHeader";

export const Users = () => {
    return (
        <Box>
            <UsersHeader/>
            <UsersTable/>
        </Box>
    )
}