import React, {FC, useCallback} from 'react';
import {ToggleButtonBox} from "./ToggleButtonBox/ToggleButtonBox";
import {DoubleRangeCards} from "./DoubleRangeCards/DoubleRangeCards";
import {ResetSettings} from "./ResetSettings/ResetSettings";
import {Box, Typography} from "@mui/material";
import {useAppSelector} from "../../../hooks/hooks";
import {Search} from "../../../components/search/Search";
import {useActions} from "../../../hooks/useActions";

export const FilterBlock: FC = () => {
    const {setPackName} = useActions()

    const packName = useAppSelector(state => state.packs.packName)

    const setSearchName = useCallback((searchName: string) => {
        setPackName(searchName)
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
    )
}