import React, {FC, useEffect} from 'react';
import {Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {FilterBlock} from "./FilterBlock/FilterBlock";
import {TableBlock} from "./TableBlock/TableBlock";
import {PackListHeader} from "./PackListHeader/PackListHeader";
import {getPacks} from "../../store/Packs/asyncThunk";

export const PacksList: FC = () => {
    const dispatch = useAppDispatch()
    const {
        packName,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        showPacks,
    } = useAppSelector(state => state.packs)

    useEffect(() => {
        dispatch(getPacks())
    }, [packName, min, max, sortPacks, page, pageCount, showPacks, dispatch])

    return (
        <Box>
            <PackListHeader/>
            <FilterBlock/>
            <TableBlock/>
        </Box>
    );
}