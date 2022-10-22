import React, {FC, useState} from 'react';
import {IconButton, Stack, TableCell, TableRow} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {PackType, UpdatePackType} from "../../../../api/packsAPI";
import {useAppSelector} from "../../../../hooks/hooks";
import {useNavigate} from "react-router-dom";
import {BasicModal} from "../../../../components/Modals/BasicModal";
import {UpdatePackModal} from "./UpdatePackModal/UpdatePackModal";
import {QuestionModal} from "../../../../components/Modals/QuestionModal";
import {useActions} from "../../../../hooks/useActions";
import noImage from '../../../../assets/no-image.jpg';

export const CustomPackRow: FC<{ pack: PackType }> = ({pack}) => {
    const navigate = useNavigate()
    const {deletePack, updatePack} = useActions()

    const [openAdd, setOpenAdd] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [packCover, setPackCover] = useState(pack.deckCover)

    const user_id = useAppSelector(state => state.profile.profile?._id)
    const status = useAppSelector(state => state.app.status)

    const handleOpenAddModal = () => setOpenAdd(true)
    const handleCloseAddModal = () => setOpenAdd(false)

    const handleOpenDeleteModal = () => setOpenDelete(true)
    const handleCloseDeleteModal = () => setOpenDelete(false)

    const navigateToCardsList = (id: string) => {
        if (status === 'loading') return
        navigate(`/cards/${id}`)
    }
    const updatePackHandler = (pack: UpdatePackType) => {
        updatePack(pack)
        handleCloseAddModal()
    }
    const deletePackHandler = (id: string) => {
        deletePack(id)
        handleCloseDeleteModal()
    }
    const learnPackHandler = (id: string) => {
        navigate(`/learn/${id}`)
    }
    const handleError = () => {
        setPackCover(noImage)
    }

    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            hover
        >
            <TableCell align={'left'}>
                <img
                    src={packCover || noImage}
                    alt={'deck cover'}
                    style={{width: 50, height: 50}}
                    onError={handleError}
                />
            </TableCell>
            {(pack.cardsCount !== 0 || user_id === pack.user_id)
                ?
                <TableCell component={'th'} scope={'row'} align={'left'}
                           onClick={() => navigateToCardsList(pack._id)}
                           style={{
                               cursor: 'pointer',
                               maxWidth: '268px',
                               textOverflow: 'ellipsis',
                               whiteSpace: 'nowrap',
                               overflow: 'hidden',
                           }}>
                    {pack.name}
                </TableCell>
                :
                <TableCell component={'th'} scope={'row'} align={'left'}
                           style={{
                               maxWidth: '268px',
                               textOverflow: 'ellipsis',
                               whiteSpace: 'nowrap',
                               overflow: 'hidden',
                           }}>
                    {pack.name}
                </TableCell>
            }
            <TableCell align={'left'}>
                {pack.cardsCount}
            </TableCell>
            <TableCell align={'left'}>
                {new Date(pack.updated).toLocaleString()}
            </TableCell>
            <TableCell component={'th'} scope={'row'} align={'left'}
                       style={{
                           maxWidth: '180px',
                           textOverflow: 'ellipsis',
                           whiteSpace: 'nowrap',
                           overflow: 'hidden',
                       }}>
                {pack.user_name}
            </TableCell>
            <TableCell align={'left'}>
                {user_id === pack.user_id
                    ?
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <IconButton aria-label={'learn'} size={'small'}
                                    onClick={() => learnPackHandler(pack._id)}
                                    disabled={pack.cardsCount === 0 || status === 'loading'}>
                            <SchoolIcon fontSize={'small'}/>
                        </IconButton>
                        <IconButton aria-label={'update'} size={'small'}
                                    onClick={handleOpenAddModal}
                                    disabled={status === 'loading'}>
                            <EditIcon fontSize={'small'}/>
                        </IconButton>
                        <IconButton aria-label={'delete'} size={'small'}
                                    onClick={handleOpenDeleteModal}
                                    disabled={status === 'loading'}>
                            <DeleteIcon fontSize={'small'}/>
                        </IconButton>
                    </Stack>
                    :
                    <Stack direction={'row'} alignItems={'flex-start'} spacing={1}>
                        <IconButton aria-label={'delete'} size={'small'}
                                    onClick={() => learnPackHandler(pack._id)}
                                    disabled={pack.cardsCount === 0 || status === 'loading'}>
                            <SchoolIcon fontSize={'small'}/>
                        </IconButton>
                    </Stack>}
                <BasicModal open={openAdd} setOpen={setOpenAdd}>
                    <UpdatePackModal
                        pack_id={pack._id}
                        packName={pack.name}
                        deckCover={pack.deckCover}
                        packIsPrivate={pack.private}
                        navigateBack={handleCloseAddModal}
                        saveData={updatePackHandler}
                    />
                </BasicModal>
                <BasicModal open={openDelete} setOpen={setOpenDelete}>
                    <QuestionModal
                        title={'Delete Packs'}
                        itemName={pack.name}
                        itemId={pack._id}
                        navigateBack={handleCloseDeleteModal}
                        deleteItem={deletePackHandler}
                    />
                </BasicModal>
            </TableCell>
        </TableRow>
    )
}