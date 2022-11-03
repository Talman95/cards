import React, {FC, useState} from 'react';
import {IconButton, Rating, Stack, TableCell, TableRow, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppSelector} from "../../../../hooks/hooks";
import {CardType, UpdateCardType} from "../../../../api/cardsAPI";
import {BasicModal} from "../../../../components/BasicModal/BasicModal";
import {QuestionModal} from "../../../../components/QuestionModal/QuestionModal";
import {UpdateCardModal} from "./UpdateCardModal/UpdateCardModal";
import {useActions} from "../../../../hooks/useActions";

export const CustomCardRow: FC<{c: CardType}> = ({c}) => {
    const {deleteCard, updateCard} = useActions()

    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)

    const userId = useAppSelector(state => state.profile.profile?._id)

    const handleOpenDeleteModal = () => setOpenDelete(true)
    const handleCloseDeleteModal = () => setOpenDelete(false)
    const handleDeleteCard = (id: string) => {
        deleteCard(id)
        handleCloseDeleteModal()
    }

    const handleOpenUpdateModal = () => setOpenUpdate(true)
    const handleCloseUpdateModal = () => setOpenUpdate(false)
    const handleUpdateCard = (card: UpdateCardType) => {
        updateCard(card)
        handleCloseUpdateModal()
    }

    return (
        <TableRow
            key={c._id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            hover
        >
            <TableCell component={'th'} scope={'row'} align={'left'}
                       style={{width: '261px', overflowWrap: 'anywhere'}}
            >
                {c.questionImg &&
                    <img
                        src={c.questionImg}
                        alt={'question cover'}
                        style={{maxWidth: 150, maxHeight: 150}}
                    />}
                {(c.question !== '' && c.question !== 'no question') &&
                    <Typography>
                        {c.question}
                    </Typography>
                }
            </TableCell>
            <TableCell component={'th'} scope={'row'} align={'left'}
                       style={{width: '261px', overflowWrap: 'anywhere'}}
            >
                {c.answerImg &&
                    <img
                        src={c.answerImg}
                        alt={'answer cover'}
                        style={{maxWidth: 150, maxHeight: 150}}
                    />}
                {(c.answer !== '' && c.answer !== 'no answer') &&
                    <Typography>
                        {c.answer}
                    </Typography>
                }
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
                                    onClick={handleOpenUpdateModal}>
                            <EditIcon fontSize={'small'}/>
                        </IconButton>
                        <IconButton aria-label={'delete'} size={'small'}
                                    onClick={handleOpenDeleteModal}>
                            <DeleteIcon fontSize={'small'}/>
                        </IconButton>
                    </Stack>
                    <BasicModal open={openUpdate} setOpen={setOpenUpdate}>
                        <UpdateCardModal
                            card={c}
                            navigateBack={handleCloseUpdateModal}
                            updateCard={handleUpdateCard}
                        />
                    </BasicModal>
                    <BasicModal open={openDelete} setOpen={setOpenDelete}>
                        <QuestionModal
                            title={'Delete Card'}
                            itemName={c.question}
                            itemId={c._id}
                            navigateBack={handleCloseDeleteModal}
                            deleteItem={handleDeleteCard}
                        />
                    </BasicModal>
                </TableCell>
            }
        </TableRow>
    )
}