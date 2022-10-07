import React, {FC, memo} from 'react';
import {Box, IconButton} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import {useActions} from "../../../../hooks/useActions";

export const ResetSettings: FC = memo(() => {
    console.log('Reset')

    const {setDefaultValues} = useActions()

    const setDefaultValuesHandler = () => {
        setDefaultValues()
    }

    return (
        <Box style={{display: 'flex', alignItems: 'center'}}>
            <IconButton aria-label='delete'>
                <TuneIcon onClick={setDefaultValuesHandler}/>
            </IconButton>
        </Box>
    )
})