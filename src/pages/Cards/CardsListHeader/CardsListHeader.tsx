import React, {FC, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useAppSelector} from "../../../hooks/hooks";
import {BasicModal} from "../../../components/modals/BasicModal";
import {AddCardModal} from "./AddCardModal/AddCardModal";
import {AddCardType} from "../../../api/cardsAPI";
import {useActions} from "../../../hooks/useActions";

export const CardsListHeader: FC = () => {
    const [open, setOpen] = useState(false)
    const {addCard} = useActions()

    const packUserId = useAppSelector(state => state.cards.packUserId)
    const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
    const currentCardPackName = useAppSelector(state => state.cards.currentCardPackName)

    const userId = useAppSelector(state => state.profile.profile?._id)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const addCardHandle = (card: AddCardType) => {
        addCard(card)
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
    )
}