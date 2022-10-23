import React from 'react';
import {ToggleButtonBox} from "./ToggleButtonBox/ToggleButtonBox";
import {ResetSettings} from "./ResetSettings/ResetSettings";
import {Box} from "@mui/material";
import {SearchBox} from "./SearchBox/SearchBox";
import {PacksDoubleSlider} from "./PacksDoubleSlider/PacksDoubleSlider";

export const FilterBlock = () => {
    return (
        <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <SearchBox/>
            <ToggleButtonBox/>
            <PacksDoubleSlider/>
            <ResetSettings/>
        </Box>
    )
}