import React, {FC} from 'react';
import {ToggleButtonBox} from "./ToggleButtonBox/ToggleButtonBox";
import {ResetSettings} from "./ResetSettings/ResetSettings";
import {Box} from "@mui/material";
import {SearchBox} from "./SearchBox/SearchBox";
import {PacksDoubleSlider} from "./PacksDoubleSlider/PacksDoubleSlider";

type PropsType = {
    onMyPacksClick: () => void
    onAllPacksClick: () => void
}

export const FilterBlock:FC<PropsType> = ({onMyPacksClick, onAllPacksClick}) => {
    return (
        <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <SearchBox/>
            <ToggleButtonBox onAllPacksClick={onAllPacksClick} onMyPacksClick={onMyPacksClick}/>
            <PacksDoubleSlider/>
            <ResetSettings/>
        </Box>
    )
}