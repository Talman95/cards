import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useAppSelector} from "../../hooks/hooks";
import {FilterBlock} from "./FilterBlock/FilterBlock";
import {TableBlock} from "./TableBlock/TableBlock";
import {PackListHeader} from "./PackListHeader/PackListHeader";
import {useActions} from "../../hooks/useActions";
import {useSearchParams} from "react-router-dom";

export const Packs = () => {
    const {getPacks, setShowPacks} = useActions()

    const [searchParams, setSearchParams] = useSearchParams()

    const packName = useAppSelector(state => state.packs.packName)
    const min = useAppSelector(state => state.packs.min)
    const max = useAppSelector(state => state.packs.max)
    const sortPacks = useAppSelector(state => state.packs.sortPacks)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const accessory = useAppSelector(state => state.packs.accessory)

    useEffect(() => {
        const param = searchParams.get('accessory') || accessory
        if (param === ('my' || 'all')) {
            setShowPacks(param)
        } else {
            setShowPacks('all')
        }
    }, [])

    useEffect(() => {
        setSearchParams({accessory: accessory})
    }, [accessory])

    useEffect(() => {
        getPacks()
    }, [packName, min, max, sortPacks, page, pageCount, accessory])

    return (
        <Box>
            <PackListHeader/>
            <FilterBlock/>
            <TableBlock/>
        </Box>
    )
}