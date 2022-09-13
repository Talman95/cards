import React, {FC, useState} from 'react';
import {IconButton, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {PackType, UpdatePackType} from "../../../p3-dal/packsAPI";
import {useAppDispatch, useAppSelector} from "../../../../../c0-common/c1-hooks/hooks";
import {deletePack, updatePack} from "../../../p2-bll/packsReducer";
import {setCardPackId} from "../../../../f3-cards/c2-bll/cardsReducer";
import {PATH} from "../../../../../c1-main/m1-ui/routes/RoutesPage";
import {useNavigate} from "react-router-dom";
import {BasicModal} from "../../../../../c0-common/c2-components/Modals/BasicModal";
import {UpdatePackModal} from "./UpdatePackModal/UpdatePackModal";
import {QuestionModal} from "../../../../../c0-common/c2-components/Modals/QuestionModal";

export const TableInfo: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openQuestModal, setOpenQuestModal] = useState(false)
    const [selectedPack, setSelectedPack] = useState<PackType | null>(null)

    const user_id = useAppSelector(state => state.profile.profile?._id)
    const cardPacks = useAppSelector(state => state.packs.cardPacks)

    const handleAddOpen = (pack: PackType) => {
        setSelectedPack(pack)
        setOpenAddModal(true)
    }
    const handleAddClose = () => setOpenAddModal(false)
    const handleQuestOpen = (pack: PackType) => {
        setSelectedPack(pack)
        setOpenQuestModal(true)
    }
    const handleQuestClose = () => setOpenQuestModal(false)

    const navigateToCardsList = async (id: string, packName: string) => {
        await dispatch(setCardPackId({id, packName}))
        navigate(PATH.CARDS)
    }
    const updatePackHandler = (pack: UpdatePackType) => {
        dispatch(updatePack(pack))
        handleAddClose()
    }
    const deletePackHandler = (id: string) => {
        dispatch(deletePack(id))
        handleQuestClose()
    }
    const learnPackHandler = (id: string) => {
        navigate(`/learn/${id}`)
    }

    return (
        <TableBody>
            {cardPacks.map((p) => (
                <TableRow
                    key={p._id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    hover
                >
                    {(p.cardsCount !== 0 || user_id === p.user_id)
                        ?
                        <TableCell component={'th'} scope={'row'} align={'left'}
                                   onClick={() => navigateToCardsList(p._id, p.name)}
                                   style={{
                                       cursor: 'pointer',
                                       maxWidth: '268px',
                                       textOverflow: 'ellipsis',
                                       whiteSpace: 'nowrap',
                                       overflow: 'hidden',
                                   }}>
                            {p.name}
                        </TableCell>
                        :
                        <TableCell component={'th'} scope={'row'} align={'left'}
                                   style={{
                                       maxWidth: '268px',
                                       textOverflow: 'ellipsis',
                                       whiteSpace: 'nowrap',
                                       overflow: 'hidden',
                                   }}>
                            {p.name}
                        </TableCell>
                    }
                    <TableCell align={'left'}>
                        {p.cardsCount}
                    </TableCell>
                    <TableCell align={'left'}>
                        {new Date(p.updated).toLocaleString()}
                    </TableCell>
                    <TableCell component={'th'} scope={'row'} align={'left'}
                               style={{
                                   maxWidth: '180px',
                                   textOverflow: 'ellipsis',
                                   whiteSpace: 'nowrap',
                                   overflow: 'hidden',
                               }}>
                        {p.user_name}
                    </TableCell>
                    <TableCell align={'left'}>
                        {user_id === p.user_id
                            ?
                            <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                <IconButton aria-label={'learn'} size={'small'}
                                            onClick={() => learnPackHandler(p._id)}
                                            disabled={p.cardsCount === 0}>
                                    <SchoolIcon fontSize={'small'}/>
                                </IconButton>
                                <IconButton aria-label={'update'} size={'small'}
                                            onClick={() => handleAddOpen(p)}>
                                    <EditIcon fontSize={'small'}/>
                                </IconButton>
                                <IconButton aria-label={'delete'} size={'small'}
                                            onClick={() => handleQuestOpen(p)}>
                                    <DeleteIcon fontSize={'small'}/>
                                </IconButton>
                            </Stack>
                            :
                            <Stack direction={'row'} alignItems={'flex-start'} spacing={1}>
                                <IconButton aria-label={'delete'} size={'small'} disabled={p.cardsCount === 0}>
                                    <SchoolIcon fontSize={'small'}/>
                                </IconButton>
                            </Stack>}
                    </TableCell>
                </TableRow>
            ))}
            <BasicModal open={openAddModal} setOpen={setOpenAddModal}>
                <UpdatePackModal
                    pack={selectedPack}
                    navigateBack={handleAddClose}
                    saveData={updatePackHandler}
                />
            </BasicModal>
            <BasicModal open={openQuestModal} setOpen={setOpenQuestModal}>
                <QuestionModal
                    title={'Delete Pack'}
                    itemName={selectedPack ? selectedPack.name : ''}
                    itemId={selectedPack ? selectedPack._id : ''}
                    navigateBack={handleQuestClose}
                    deleteItem={deletePackHandler}
                />
            </BasicModal>
        </TableBody>
    );
}