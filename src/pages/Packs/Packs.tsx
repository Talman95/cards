import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useAppSelector} from "../../hooks/hooks";
import {FilterBlock} from "./FilterBlock/FilterBlock";
import {TableBlock} from "./TableBlock/TableBlock";
import {PackListHeader} from "./PackListHeader/PackListHeader";
import {useActions} from "../../hooks/useActions";
import {useSearchParams} from "react-router-dom";

export const Packs = () => {
    const {getPacks} = useActions()

    const [searchParams, setSearchParams] = useSearchParams()

    const filter = useAppSelector(state => state.packs.filter)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const accessory = useAppSelector(state => state.packs.accessory)

    // useEffect(() => {
    //     const param = searchParams.get('accessory') || accessory
    //     if (param === 'my') {
    //         setAccessory('my')
    //     } else {
    //         setAccessory('all')
    //     }
    // }, [])

    useEffect(() => {
        setSearchParams({accessory: accessory})
    }, [accessory])

    useEffect(() => {
        getPacks()
    }, [filter, page, pageCount, accessory])

    return (
        <Box>
            <PackListHeader/>
            <FilterBlock/>
            <TableBlock/>
        </Box>
    )
}