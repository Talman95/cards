import React, {FC, useState} from 'react';
import {Box, TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {visuallyHidden} from "@mui/utils";
import {setSortCards} from "../../../c2-bll/cardsReducer";
import {useAppDispatch, useAppSelector} from "../../../../../c0-common/c1-hooks/hooks";

type Order = 'asc' | 'desc'
type Data = 'grade' | 'updated'

export const TableHeader: FC = () => {
    const dispatch = useAppDispatch()

    const packUserId = useAppSelector(state => state.cards.packUserId)
    const userId = useAppSelector(state => state.profile.profile?._id)

    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<Data>('updated')

    const sortHandler = (order: Order, orderBy: Data) => {
        const direction = order === 'asc' ? 0 : 1
        const str = direction + orderBy

        setOrder(order)
        setOrderBy(orderBy)
        dispatch(setSortCards(str))
    }
    return (
        <TableHead>
            <TableRow>
                <TableCell align={'left'} style={{minWidth: '261px', maxWidth: '268px'}}>
                    Question
                </TableCell>
                <TableCell align={'left'} style={{minWidth: '261px', maxWidth: '268px'}}>
                    Answer
                </TableCell>
                <TableCell align={'left'} style={{width: '150px'}}>
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
                <TableCell align={'left'} style={{width: '100px'}}>
                    <TableSortLabel
                        active={orderBy === 'grade'}
                        direction={orderBy === 'grade' ? order : 'asc'}
                        onClick={() => sortHandler(order === 'asc' ? 'desc' : 'asc', 'grade')}
                    >
                        Grade
                        {orderBy === 'grade' ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
                {userId === packUserId &&
                    <TableCell align={'left'} style={{minWidth: '68px', maxWidth: '68px'}}>
                        Actions
                    </TableCell>}
            </TableRow>
        </TableHead>
    );
}