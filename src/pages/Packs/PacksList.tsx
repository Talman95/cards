import React, {FC, useEffect} from 'react';
import {Box} from "@mui/material";
import {useAppSelector} from "../../hooks/hooks";
import {FilterBlock} from "./FilterBlock/FilterBlock";
import {TableBlock} from "./TableBlock/TableBlock";
import {PackListHeader} from "./PackListHeader/PackListHeader";
import {useActions} from "../../hooks/useActions";

export const PacksList: FC = () => {
    const {getPacks} = useActions()

    const packName = useAppSelector(state => state.packs.packName)
    const min = useAppSelector(state => state.packs.min)
    const max = useAppSelector(state => state.packs.max)
    const sortPacks = useAppSelector(state => state.packs.sortPacks)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const showPacks = useAppSelector(state => state.packs.showPacks)

    useEffect(() => {
        getPacks()
    }, [packName, min, max, sortPacks, page, pageCount, showPacks])

    return (
        <Box>
            <PackListHeader/>
            <FilterBlock/>
            <TableBlock/>
        </Box>
    )
}