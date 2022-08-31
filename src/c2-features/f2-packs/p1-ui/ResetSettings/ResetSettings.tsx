import React, {FC, memo} from 'react';
import {Box, IconButton} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';

type ResetSettingsType = {
    setValues: () => void
}

export const ResetSettings: FC<ResetSettingsType> = memo(({setValues}) => {
    console.log('Reset')
    const onResetClickHandler = () => {
        setValues()
    }

    return (
        <Box style={{display: 'flex', alignItems: 'center'}}>
            <IconButton aria-label='delete'>
                <TuneIcon onClick={onResetClickHandler}/>
            </IconButton>
        </Box>
    );
})