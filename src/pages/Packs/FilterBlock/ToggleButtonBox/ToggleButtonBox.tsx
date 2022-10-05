import React, {FC} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import {AccessoryType} from "../../../../store/Packs/packsSlice";
import {useAppSelector} from "../../../../hooks/hooks";
import {useActions} from "../../../../hooks/useActions";

export const ToggleButtonBox: FC = () => {
    console.log('Toggle Button')
    const {setShowPacks} = useActions()

    const accessory = useAppSelector(state => state.packs.accessory)

    const changeShowPacksHandler = (showPacks: AccessoryType) => {
        setShowPacks(showPacks)
    }

    return (
        <Box style={{height: '62px', display: 'grid'}}>
            <Typography variant={'body2'}>Show packs cards</Typography>
            <Stack spacing={2} direction="row">
                <Button
                    variant={accessory === 'my' ? 'contained' : 'outlined'}
                    style={{width: '80px'}}
                    onClick={() => changeShowPacksHandler('my')}
                    size={'small'}
                >
                    My
                </Button>
                <Button
                    variant={accessory === 'all' ? 'contained' : 'outlined'}
                    style={{width: '80px'}}
                    onClick={() => changeShowPacksHandler('all')}
                    size={'small'}
                >
                    All
                </Button>
            </Stack>
        </Box>
    )
}