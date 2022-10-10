import React, {FC} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import {AccessoryType} from "../../../../store/Packs/packsSlice";
import {useAppSelector} from "../../../../hooks/hooks";
import {useActions} from "../../../../hooks/useActions";

export const ToggleButtonBox: FC = () => {
    const {setShowPacks} = useActions()

    const accessory = useAppSelector(state => state.packs.accessory)
    const status = useAppSelector(state => state.app.status)

    const onChange = (param: AccessoryType) => {
        setShowPacks({accessory: param})
    }

    return (
        <Box style={{height: '62px', display: 'grid'}}>
            <Typography variant={'body2'}>Show packs cards</Typography>
            <Stack spacing={2} direction="row">
                <Button
                    variant={accessory === 'my' ? 'contained' : 'outlined'}
                    style={{width: '80px'}}
                    onClick={() => onChange('my')}
                    size={'small'}
                    disabled={status === 'loading'}
                >
                    My
                </Button>
                <Button
                    variant={accessory === 'all' ? 'contained' : 'outlined'}
                    style={{width: '80px'}}
                    onClick={() => onChange('all')}
                    size={'small'}
                    disabled={status === 'loading'}
                >
                    All
                </Button>
            </Stack>
        </Box>
    )
}