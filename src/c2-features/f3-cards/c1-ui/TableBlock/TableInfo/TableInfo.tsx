import React, {FC} from 'react';
import {IconButton, Rating, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteCard, updateCard} from "../../../c2-bll/cardsReducer";
import {useAppDispatch, useAppSelector} from "../../../../../c0-common/c1-hooks/hooks";

export const TableInfo: FC = () => {
    const dispatch = useAppDispatch()

    const cards = useAppSelector(state => state.cards.cards)
    const userId = useAppSelector(state => state.profile.profile?._id)

    const deleteCardHandler = (id: string) => {
        dispatch(deleteCard(id))
    }
    const updateCardHandler = (id: string) => {
        const card = {
            _id: id,
            question: 'new question 5468 792',
            answer: 'new answer 1231 23',
        }
        dispatch(updateCard(card))
    }

    return (
        <TableBody>
            {cards.map(c => (
                <TableRow
                    key={c._id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    hover
                >
                    <TableCell component={'th'} scope={'row'} align={'left'}
                               style={{width: '261px', overflowWrap: 'anywhere'}}
                    >
                        {c.question}
                    </TableCell>
                    <TableCell component={'th'} scope={'row'} align={'left'}
                               style={{width: '261px', overflowWrap: 'anywhere'}}
                    >
                        {c.answer}
                    </TableCell>
                    <TableCell align={'left'}>
                        {new Date(c.updated).toLocaleString()}
                    </TableCell>
                    <TableCell align={'left'}>
                        <Rating
                            name={'read-only'}
                            value={c.grade}
                            readOnly
                            size={'small'}
                            precision={0.5}/>
                    </TableCell>
                    {c.user_id === userId &&
                        <TableCell align={'left'} style={{width: '70px'}}>
                            <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                <IconButton aria-label={'delete'} size={'small'}
                                            onClick={() => updateCardHandler(c._id)}>
                                    <EditIcon fontSize={'small'}/>
                                </IconButton>
                                <IconButton aria-label={'delete'} size={'small'}
                                            onClick={() => deleteCardHandler(c._id)}>
                                    <DeleteIcon fontSize={'small'}/>
                                </IconButton>
                            </Stack>
                        </TableCell>
                    }
                </TableRow>
            ))}
        </TableBody>
    );
}