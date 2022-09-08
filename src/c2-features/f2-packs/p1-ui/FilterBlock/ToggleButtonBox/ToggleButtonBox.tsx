import React, {FC} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import {setShowPacks, ShowPacksType} from "../../../p2-bll/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../../../c0-common/c1-hooks/hooks";

export const ToggleButtonBox: FC = () => {
    console.log('Toggle Button')
    const dispatch = useAppDispatch()
    const showPacks = useAppSelector(state => state.packs.showPacks)
    const changeShowPacksHandler = (showPacks: ShowPacksType) => {
        dispatch(setShowPacks(showPacks))
    }

    return (
        <Box style={{height: '62px', display: 'grid'}}>
            <Typography variant={'body2'}>Show packs cards</Typography>
            <Stack spacing={2} direction="row">
                <Button
                    variant={showPacks === 'My' ? 'contained' : 'outlined'}
                    style={{width: '80px'}}
                    onClick={() => changeShowPacksHandler('My')}
                    size={'small'}
                >
                    My
                </Button>
                <Button
                    variant={showPacks === 'All' ? 'contained' : 'outlined'}
                    style={{width: '80px'}}
                    onClick={() => changeShowPacksHandler('All')}
                    size={'small'}
                >
                    All
                </Button>
            </Stack>
        </Box>
    );
}