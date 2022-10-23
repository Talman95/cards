import React from 'react';
import {Box, Typography} from "@mui/material";
import {DoubleSlider} from "../../../../components/DoubleSlider/DoubleSlider";
import {useActions} from "../../../../hooks/useActions";
import {useAppSelector} from "../../../../hooks/hooks";

export const UsersDoubleSlider = () => {
    const {setMinMaxUsersCount} = useActions()

    const min = useAppSelector(state => state.users.minPublicCardPacksCount)
    const max = useAppSelector(state => state.users.maxPublicCardPacksCount)
    const minFilter = useAppSelector(state => state.users.filter.min)
    const maxFilter = useAppSelector(state => state.users.filter.max)
    const status = useAppSelector(state => state.app.status)

    return (
        <Box sx={{height: '62px', width: '300px', display: 'grid'}}>
            <Typography variant={'body2'}>
                Number of public packs
            </Typography>
            <DoubleSlider
                minFromServer={min}
                maxFromServer={max}
                minFromFilter={minFilter}
                maxFromFilter={maxFilter}
                setMinMaxCount={setMinMaxUsersCount}
                disabled={status === 'loading'}
            />
        </Box>
    )
}