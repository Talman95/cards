import React, {FC, useState} from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import {useAppSelector} from "../../../hooks/hooks";
import {BasicModal} from "../../../components/modals/BasicModal";
import {AddCardModal} from "./AddCardModal/AddCardModal";
import {AddCardType} from "../../../api/cardsAPI";
import {useActions} from "../../../hooks/useActions";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate} from "react-router-dom";

type PropsType = {
    cardsPackId: string
    length: number
}

export const CardsListHeader: FC<PropsType> = ({cardsPackId, length}) => {
    const {addCard} = useActions()
    const navigate = useNavigate()

    const packUserId = useAppSelector(state => state.cards.packUserId)
    const userId = useAppSelector(state => state.profile.profile?._id)
    const packName = useAppSelector(state => state.cards.packName)
    const packDeckCover = useAppSelector(state => state.cards.packDeckCover)

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const addCardHandle = (card: AddCardType) => {
        addCard(card)
        handleClose()
    }
    const navigateToPacksList = () => navigate(-1)
    const learnPackHandler = () => navigate(`/learn/${cardsPackId}`)

    return (
        <Box style={{marginBottom: '10px'}}>
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                <IconButton aria-label={'delete'} size={'small'} onClick={navigateToPacksList}>
                    <KeyboardBackspaceIcon fontSize={'small'}/>
                </IconButton>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant={'h6'}>
                    {packName}
                </Typography>
                {userId === packUserId
                    ?
                    <Button variant={'contained'} onClick={handleOpen}>
                        Add new card
                    </Button>
                    :
                    <Button variant={'contained'} onClick={learnPackHandler} disabled={length === 0}>
                        Learn pack
                    </Button>
                }
            </Box>
            {packDeckCover &&
                <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                    <img
                        src={packDeckCover}
                        alt={'pack cover'}
                        style={{width: 100, height: 100}}
                    />
                </Box>
            }
            <BasicModal open={open} setOpen={setOpen}>
                <AddCardModal
                    cardsPack_id={cardsPackId}
                    navigateBack={handleClose}
                    addCard={addCardHandle}
                />
            </BasicModal>
        </Box>
    )
}