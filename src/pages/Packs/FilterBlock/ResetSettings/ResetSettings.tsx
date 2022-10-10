import React, {FC, memo} from 'react';
import {Box, IconButton} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import {useActions} from "../../../../hooks/useActions";
import {useAppSelector} from "../../../../hooks/hooks";

export const ResetSettings: FC = memo(() => {
    console.log('Reset')

    const {setDefaultValues} = useActions()

    const status = useAppSelector(state => state.app.status)

    const setDefaultValuesHandler = () => {
        setDefaultValues()
    }

    return (
        <Box style={{display: 'flex', alignItems: 'center'}}>
            <IconButton
                disabled={status === 'loading'}
                onClick={setDefaultValuesHandler}
            >
                <TuneIcon/>
            </IconButton>
        </Box>
    )
})