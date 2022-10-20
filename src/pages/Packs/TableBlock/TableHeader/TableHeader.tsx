import React, {FC, useState} from 'react';
import {Box, TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {visuallyHidden} from "@mui/utils";
import {useActions} from "../../../../hooks/useActions";

type Order = 'asc' | 'desc'
type Data = 'cardsCount' | 'updated'

export const TableHeader: FC = () => {
    const {setSortPacks} = useActions()

    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<Data>('updated')

    const sortHandler = (order: Order, orderBy: Data) => {
        const direction = order === 'asc' ? 0 : 1
        const str = direction + orderBy

        setOrder(order)
        setOrderBy(orderBy)
        setSortPacks(str)
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell align={'left'} style={{minWidth: '70px', maxWidth: '70px'}}>
                    Cover
                </TableCell>
                <TableCell align={'left'} style={{minWidth: '268px', maxWidth: '268px'}}>
                    Name
                </TableCell>
                <TableCell align={'left'} style={{minWidth: '50px', maxWidth: '50px'}}>
                    <TableSortLabel
                        active={orderBy === 'cardsCount'}
                        direction={orderBy === 'cardsCount' ? order : 'asc'}
                        onClick={() => sortHandler(order === 'asc' ? 'desc' : 'asc', 'cardsCount')}
                    >
                        Cards
                        {orderBy === 'cardsCount' ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
                <TableCell align={'left'} style={{minWidth: '220px', maxWidth: '220px'}}>
                    <TableSortLabel
                        active={orderBy === 'updated'}
                        direction={orderBy === 'updated' ? order : 'asc'}
                        onClick={() => sortHandler(order === 'asc' ? 'desc' : 'asc', 'updated')}
                    >
                        Last Updated
                        {orderBy === 'updated' ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
                <TableCell align={'left'} style={{minWidth: '180px', maxWidth: '180px'}}>
                    Created by
                </TableCell>
                <TableCell align={'left'} style={{minWidth: '150px', maxWidth: '150px'}}>
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    )
}