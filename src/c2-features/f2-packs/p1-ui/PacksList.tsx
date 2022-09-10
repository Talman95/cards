import React, {FC, useEffect} from 'react';
import {Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {getPacks} from "../p2-bll/packsReducer";
import {Navigate} from "react-router-dom";
import {FilterBlock} from "./FilterBlock/FilterBlock";
import {TableBlock} from "./TableBlock/TableBlock";
import {PackListHeader} from "./PackListHeader/PackListHeader";

export const PacksList: FC = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
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

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Box>
            <PackListHeader/>
            <FilterBlock/>
            <TableBlock/>
        </Box>
    );
}