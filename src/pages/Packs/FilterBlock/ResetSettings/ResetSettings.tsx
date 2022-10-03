import React, {FC, memo} from 'react';
import {Box, IconButton} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import {setDefaultValues} from "../../../../store/Packs/packsSlice";
import {useAppDispatch} from "../../../../hooks/hooks";

export const ResetSettings: FC = memo(() => {
    console.log('Reset')
    const dispatch = useAppDispatch()

    const setDefaultValuesHandler = () => {
        dispatch(setDefaultValues())
    }

    return (
        <Box style={{display: 'flex', alignItems: 'center'}}>
            <IconButton aria-label='delete'>
                <TuneIcon onClick={setDefaultValuesHandler}/>
            </IconButton>
        </Box>
    );
})