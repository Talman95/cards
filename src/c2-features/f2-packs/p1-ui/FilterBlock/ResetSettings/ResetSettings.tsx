import React, {FC, memo} from 'react';
import {Box, IconButton} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import {setDefaultValues} from "../../../p2-bll/packsReducer";
import {useAppDispatch} from "../../../../../c0-common/c1-hooks/hooks";

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