import React, {FC, memo} from 'react';
import {Box, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {setShowPacks, ShowPacksType} from "../../p2-bll/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";

export const ToggleButtonBox: FC = memo(() => {
    console.log('Button Box')
    const dispatch = useAppDispatch()
    const showPacks = useAppSelector(state => state.packs.showPacks)
    const handleChangeShowPacks = (event: React.MouseEvent<HTMLElement>, value: ShowPacksType) => {
        dispatch(setShowPacks(value))
    }
    return (
        <Box>
            <Typography variant={'body2'}>Show packs cards</Typography>
            <ToggleButtonGroup
                color={'primary'}
                value={showPacks}
                exclusive
                onChange={handleChangeShowPacks}
                aria-label={'Platform'}
                size={'small'}
                style={{width: '120px'}}
            >
                <ToggleButton style={{width: '-webkit-fill-available'}} value={'My'}>My</ToggleButton>
                <ToggleButton style={{width: '-webkit-fill-available'}} value={'All'}>All</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
})