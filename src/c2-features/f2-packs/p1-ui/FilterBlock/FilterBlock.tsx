import React, {FC, useCallback} from 'react';
import {ToggleButtonBox} from "./ToggleButtonBox/ToggleButtonBox";
import {DoubleRangeCards} from "./DoubleRangeCards/DoubleRangeCards";
import {ResetSettings} from "./ResetSettings/ResetSettings";
import {Box, Typography} from "@mui/material";
import {setPackName} from "../../p2-bll/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";
import {Search} from "../../../../c0-common/c2-components/Search/Search";

export const FilterBlock: FC = () => {
    const dispatch = useAppDispatch()
    const {packName} = useAppSelector(state => state.packs)

    const setSearchName = useCallback((searchName: string) => {
        dispatch(setPackName(searchName))
    }, [])

    return (
        <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box style={{height: '62px', width: '300px'}}>
                <Typography variant={'body2'}>Search</Typography>
                <Search title={packName} setTitle={setSearchName}/>
            </Box>
            <ToggleButtonBox/>
            <DoubleRangeCards/>
            <ResetSettings/>
        </Box>
    );
}