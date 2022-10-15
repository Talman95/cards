import React, {FC, useState} from 'react';
import {Box, Button, IconButton, styled, Tooltip, tooltipClasses, TooltipProps, Typography} from "@mui/material";
import {useAppSelector} from "../../../hooks/hooks";
import {BasicModal} from "../../../components/modals/BasicModal";
import {AddCardModal} from "./AddCardModal/AddCardModal";
import {AddCardType} from "../../../api/cardsAPI";
import {useActions} from "../../../hooks/useActions";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate} from "react-router-dom";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {ActionMenu} from "./ActionMenu/ActionMenu";
import {UpdatePackModal} from "../../Packs/TableBlock/TableInfo/UpdatePackModal/UpdatePackModal";
import {UpdatePackType} from "../../../api/packsAPI";
import {QuestionModal} from "../../../components/modals/QuestionModal";
import {PATH} from "../../../components/routes/RoutesPage";

type PropsType = {
    cardsPackId: string
    length: number
}

export const CardsListHeader: FC<PropsType> = ({cardsPackId, length}) => {
    const {addCard, updatePack, deletePack, getCards} = useActions()
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


    const [openAddCard, setOpenAddCard] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [openTooltip, setOpenTooltip] = useState(false)

    const handleAddCardOpen = () => setOpenAddCard(true)
    const handleAddCardClose = () => setOpenAddCard(false)
    const addCardHandle = (card: AddCardType) => {
        addCard(card)
        handleAddCardClose()
    }
    const handleOpenUpdate = () => setUpdateModal(true)
    const updatePackHandler = async (pack: UpdatePackType) => {
        setUpdateModal(false)
        await updatePack(pack)
        getCards(cardsPackId)
    }
    const deletePackHandler = async () => {
        setDeleteModal(false)
        await deletePack(cardsPackId)
        navigate(PATH.PACKS)
    }
    const handleOpenDelete = () => setDeleteModal(true)
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
                                               showUpdateModal={handleOpenUpdate}
                                               showDeleteModal={handleOpenDelete}
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
                    <Button variant={'contained'} onClick={handleAddCardOpen} disabled={status === 'loading'}>
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
            <BasicModal open={openAddCard} setOpen={setOpenAddCard}>
                <AddCardModal
                    cardsPack_id={cardsPackId}
                    navigateBack={handleAddCardClose}
                    addCard={addCardHandle}
                />
            </BasicModal>
            <BasicModal open={updateModal} setOpen={handleOpenUpdate}>
                <UpdatePackModal
                    pack_id={cardsPackId}
                    packName={packName || ''}
                    deckCover={packDeckCover}
                    packIsPrivate={!!packIsPrivate}
                    navigateBack={() => setUpdateModal(false)}
                    saveData={updatePackHandler}
                />
            </BasicModal>
            <BasicModal open={deleteModal} setOpen={() => setDeleteModal(false)}>
                <QuestionModal
                    title={'Delete Packs'}
                    itemName={packName || ''}
                    itemId={cardsPackId}
                    navigateBack={() => setDeleteModal(false)}
                    deleteItem={deletePackHandler}
                />
            </BasicModal>
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