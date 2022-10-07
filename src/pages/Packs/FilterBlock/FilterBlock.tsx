import React from 'react';
import {ToggleButtonBox} from "./ToggleButtonBox/ToggleButtonBox";
import {DoubleRangeCards} from "./DoubleRangeCards/DoubleRangeCards";
import {ResetSettings} from "./ResetSettings/ResetSettings";
import {Box} from "@mui/material";
import {SearchBox} from "./SearchBox/SearchBox";

export const FilterBlock = () => {
    return (
        <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <SearchBox/>
            <ToggleButtonBox/>
            <DoubleRangeCards/>
            <ResetSettings/>
        </Box>
    )
}