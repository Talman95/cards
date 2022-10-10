import React, {FC, useState} from 'react';
import {IconButton, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {PackType, UpdatePackType} from "../../../../api/packsAPI";
import {useAppSelector} from "../../../../hooks/hooks";
import {useNavigate} from "react-router-dom";
import {BasicModal} from "../../../../components/modals/BasicModal";
import {UpdatePackModal} from "./UpdatePackModal/UpdatePackModal";
import {QuestionModal} from "../../../../components/modals/QuestionModal";
import {useActions} from "../../../../hooks/useActions";

export const TableInfo: FC = () => {
    const navigate = useNavigate()
    const {deletePack, updatePack} = useActions()

    const [openAddModal, setOpenAddModal] = useState(false)
    const [openQuestModal, setOpenQuestModal] = useState(false)
    const [selectedPack, setSelectedPack] = useState<PackType | null>(null)

    const user_id = useAppSelector(state => state.profile.profile?._id)
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const status = useAppSelector(state => state.app.status)

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

    const navigateToCardsList = (id: string) => {
        if (status === 'loading') return
        navigate(`/cards/${id}`)
    }
    const updatePackHandler = (pack: UpdatePackType) => {
        updatePack(pack)
        handleAddClose()
    }
    const deletePackHandler = (id: string) => {
        deletePack(id)
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
                                   onClick={() => navigateToCardsList(p._id)}
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
                                            disabled={p.cardsCount === 0 || status === 'loading'}>
                                    <SchoolIcon fontSize={'small'}/>
                                </IconButton>
                                <IconButton aria-label={'update'} size={'small'}
                                            onClick={() => handleAddOpen(p)}
                                            disabled={status === 'loading'}>
                                    <EditIcon fontSize={'small'}/>
                                </IconButton>
                                <IconButton aria-label={'delete'} size={'small'}
                                            onClick={() => handleQuestOpen(p)}
                                            disabled={status === 'loading'}>
                                    <DeleteIcon fontSize={'small'}/>
                                </IconButton>
                            </Stack>
                            :
                            <Stack direction={'row'} alignItems={'flex-start'} spacing={1}>
                                <IconButton aria-label={'delete'} size={'small'}
                                            onClick={() => learnPackHandler(p._id)}
                                            disabled={p.cardsCount === 0 || status === 'loading'}>
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
                    title={'Delete Packs'}
                    itemName={selectedPack ? selectedPack.name : ''}
                    itemId={selectedPack ? selectedPack._id : ''}
                    navigateBack={handleQuestClose}
                    deleteItem={deletePackHandler}
                />
            </BasicModal>
        </TableBody>
    );
}