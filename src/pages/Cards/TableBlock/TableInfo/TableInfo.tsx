import React, {FC, useState} from 'react';
import {IconButton, Rating, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppSelector} from "../../../../hooks/hooks";
import {CardType, UpdateCardType} from "../../../../api/cardsAPI";
import {BasicModal} from "../../../../components/modals/BasicModal";
import {QuestionModal} from "../../../../components/modals/QuestionModal";
import {UpdateCardModal} from "./UpdateCardModal/UpdateCardModal";
import {useActions} from "../../../../hooks/useActions";

export const TableInfo: FC = () => {
    const {deleteCard, updateCard} = useActions()

    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null)

    const cards = useAppSelector(state => state.cards.cards)
    const userId = useAppSelector(state => state.profile.profile?._id)

    const handleDeleteOpen = (card: CardType) => {
        setSelectedCard(card)
        setOpenDelete(true)
    }
    const handleDeleteClose = () => setOpenDelete(false)
    const handleUpdateOpen = (card: CardType) => {
        setSelectedCard(card)
        setOpenUpdate(true)
    }
    const handleUpdateClose = () => setOpenUpdate(false)

    const deleteCardHandler = (id: string) => {
        deleteCard(id)
        handleDeleteClose()
    }
    const updateCardHandler = (card: UpdateCardType) => {
        updateCard(card)
        handleUpdateClose()
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
                                            onClick={() => handleUpdateOpen(c)}>
                                    <EditIcon fontSize={'small'}/>
                                </IconButton>
                                <IconButton aria-label={'delete'} size={'small'}
                                            onClick={() => handleDeleteOpen(c)}>
                                    <DeleteIcon fontSize={'small'}/>
                                </IconButton>
                            </Stack>
                        </TableCell>
                    }
                </TableRow>
            ))}
            <BasicModal open={openUpdate} setOpen={setOpenUpdate}>
                <UpdateCardModal
                    cardId={selectedCard ? selectedCard._id : ''}
                    answer={selectedCard ? selectedCard.answer : ''}
                    question={selectedCard ? selectedCard.question : ''}
                    navigateBack={handleUpdateClose}
                    updateCard={updateCardHandler}
                />
            </BasicModal>
            <BasicModal open={openDelete} setOpen={setOpenDelete}>
                <QuestionModal
                    title={'Delete Card'}
                    itemName={selectedCard ? selectedCard.question : ''}
                    itemId={selectedCard ? selectedCard._id : ''}
                    navigateBack={handleDeleteClose}
                    deleteItem={deleteCardHandler}
                />
            </BasicModal>
        </TableBody>
    );
}