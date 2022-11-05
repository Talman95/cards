import React, {FC, useState} from 'react';
import {Box, Button, IconButton, styled, Tooltip, tooltipClasses, TooltipProps, Typography} from "@mui/material";
import {useAppSelector} from "../../../hooks/hooks";
import {AddCardType} from "../../../api/cardsAPI";
import {useActions} from "../../../hooks/useActions";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate} from "react-router-dom";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {ActionMenu} from "./ActionMenu/ActionMenu";
import {UpdatePackType} from "../../../api/packsAPI";
import {modalType} from "../../../enums/modalType";
import {DeleteModalType} from "../../../store/Modal/modalSlice";

type PropsType = {
    cardsPackId: string
    length: number
}

export const CardsListHeader: FC<PropsType> = ({cardsPackId, length}) => {
    const {setModalOpen} = useActions()
    const navigate = useNavigate()

    const packUserId = useAppSelector(state => state.cards.packUserId)
    const userId = useAppSelector(state => state.profile.profile?._id)
    const packName = useAppSelector(state => state.cards.packName)
    const status = useAppSelector(state => state.app.status)
    const packDeckCover = useAppSelector(state => state.cards.packDeckCover)
    const isLoading = useAppSelector(state => state.cards.isLoading)
    const pack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === cardsPackId))
    const packIsPrivate = pack?.private
    const isUserPack: boolean = packUserId === userId

    const [openTooltip, setOpenTooltip] = useState(false)

    const onAddCardClick = () => {
        setModalOpen({
            type: modalType.ADD_CARD,
            data: {
                cardsPack_id: cardsPackId,
                question: '',
                answer: '',
            } as AddCardType
        })
    }
    const onUpdatePackClick = () => {
        setModalOpen({
            type: modalType.UPDATE_PACK,
            data: {
                _id: cardsPackId,
                name: packName,
                deckCover: packDeckCover,
                isPrivate: packIsPrivate,
            } as UpdatePackType
        })
    }
    const onDeletePackClick = () => {
        setModalOpen({
            type: modalType.DELETE_PACK,
            data: {
                id: cardsPackId,
                title: packName || '',
            } as DeleteModalType
        })
    }

    const handleCloseTooltip = () => setOpenTooltip(false)
    const navigateToPacksList = () => navigate(-1)
    const learnPackHandler = () => navigate('/learn/' + cardsPackId)

    return (
        <Box style={{marginBottom: '10px'}}>
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                <IconButton size={'small'} onClick={navigateToPacksList}>
                    <KeyboardBackspaceIcon fontSize={'small'}/>
                </IconButton>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{display: 'flex'}}>
                    <Typography variant={'h6'}>
                        {packName}
                    </Typography>
                    {(isUserPack && !isLoading) &&
                        <CustomTooltip
                            title={<ActionMenu blocked={!isUserPack || length === 0}
                                               showUpdateModal={onUpdatePackClick}
                                               showDeleteModal={onDeletePackClick}
                                               closeTooltip={handleCloseTooltip}
                            />}
                            open={openTooltip}
                            onClose={handleCloseTooltip}
                            onOpen={() => setOpenTooltip(true)}
                            placement={'right'}>
                            <IconButton size={'small'}>
                                <InfoOutlinedIcon/>
                            </IconButton>
                        </CustomTooltip>}
                </Box>
                {isUserPack
                    ?
                    <Button variant={'contained'} onClick={onAddCardClick} disabled={status === 'loading'}>
                        Add new card
                    </Button>
                    :
                    <Button variant={'contained'} onClick={learnPackHandler}
                            disabled={length === 0 || status === 'loading'}>
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
        </Box>
    )
}

const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))