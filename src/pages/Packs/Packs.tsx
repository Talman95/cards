import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useAppSelector} from "../../hooks/hooks";
import {FilterBlock} from "./FilterBlock/FilterBlock";
import {TableBlock} from "./TableBlock/TableBlock";
import {PackListHeader} from "./PackListHeader/PackListHeader";
import {useActions} from "../../hooks/useActions";
import {useSearchParams} from "react-router-dom";

export const Packs = () => {
    const {getPacks, setParamUserId, setCurrentPage} = useActions()

    const [searchParams, setSearchParams] = useSearchParams()

    const filter = useAppSelector(state => state.packs.filter)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const userId = useAppSelector(state => state.profile.profile?._id)

    useEffect(() => {
        const paramId = searchParams.get('id')
        setParamUserId(paramId)
        getPacks(paramId)
    },[filter, page, pageCount, searchParams])

    const onMyPacksClick = () => {
        if (!userId) return
        setSearchParams({id: userId})
        setCurrentPage(1)
    }
    const onAllPacksClick = () => {
        searchParams.delete('id')
        setSearchParams(searchParams)
        setCurrentPage(1)
    }

    return (
        <Box>
            <PackListHeader/>
            <FilterBlock onAllPacksClick={onAllPacksClick} onMyPacksClick={onMyPacksClick}/>
            <TableBlock/>
        </Box>
    )
}