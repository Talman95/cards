import React, {FC, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {addCard} from "../../c2-bll/cardsReducer";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";
import {BasicModal} from "../../../../c0-common/c2-components/Modals/BasicModal";
import {AddCardModal} from "./AddCardModal/AddCardModal";
import {AddCardType} from "../../c3-dal/cardsAPI";

export const CardsListHeader: FC = () => {
    const dispatch = useAppDispatch()
    const {
        packUserId,
        cardsPack_id,
        currentCardPackName
    } = useAppSelector(state => state.cards)
    const userId = useAppSelector(state => state.profile.profile?._id)

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const addCardHandle = (card: AddCardType) => {
        dispatch(addCard(card))
        handleClose()
    }

    return (
        <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
            <Typography variant={'h6'}>{currentCardPackName}</Typography>
            {userId === packUserId
                ?
                <Button variant={'contained'} onClick={handleOpen}>
                    Add new card
                </Button>
                :
                <Button variant={'contained'}>
                    Learn pack
                </Button>
            }
            <BasicModal open={open} setOpen={setOpen}>
                <AddCardModal
                    cardsPack_id={cardsPack_id}
                    navigateBack={handleClose}
                    addCard={addCardHandle}
                />
            </BasicModal>
        </Box>
    );
}