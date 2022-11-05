import React, {FC, useState} from 'react';
import {IconButton, Stack, TableCell, TableRow} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {PackType} from "../../../../api/packsAPI";
import {useAppSelector} from "../../../../hooks/hooks";
import {useNavigate} from "react-router-dom";
import {BasicModal} from "../../../../components/BasicModalOld/BasicModal";
import {useActions} from "../../../../hooks/useActions";
import noImage from '../../../../assets/no-image.jpg';
import {ViewedUser} from "../../../Users/ViewedUser/ViewedUser";
import {modalType} from "../../../../enums/modalType";
import {DeleteModalType} from "../../../../store/Modal/modalSlice";

export const CustomPackRow: FC<{ pack: PackType }> = ({pack}) => {
    const navigate = useNavigate()

    const {setModalOpen} = useActions()

    const [userModal, setUserModal] = useState(false)
    const [packCover, setPackCover] = useState(pack.deckCover)

    const user_id = useAppSelector(state => state.profile.profile?._id)
    const status = useAppSelector(state => state.app.status)

    const handleOpenUserModal = () => {
        if (status === 'loading') return
        setUserModal(true)
    }
    const handleCloseUserModal = () => setUserModal(false)

    const navigateToCardsList = (id: string) => {
        if (status === 'loading') return
        navigate(`/cards/${id}`)
    }

    const onUpdatePackClick = () => {
        setModalOpen({
            type: modalType.UPDATE_PACK,
            data: {
                _id: pack._id,
                name: pack.name,
                deckCover: pack.deckCover,
                isPrivate: pack.private,
            }
        })
    }

    const onDeletePackClick = () => {
        setModalOpen({
            type: modalType.DELETE_PACK,
            data: {
                id: pack._id,
                title: pack.name,
            } as DeleteModalType
        })
    }

    const onLearnPackClick = (id: string) => {
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
                       onClick={handleOpenUserModal}
                       style={{
                           cursor: 'pointer',
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
                                    onClick={() => onLearnPackClick(pack._id)}
                                    disabled={pack.cardsCount === 0 || status === 'loading'}>
                            <SchoolIcon fontSize={'small'}/>
                        </IconButton>
                        <IconButton aria-label={'update'} size={'small'}
                                    onClick={onUpdatePackClick}
                                    disabled={status === 'loading'}>
                            <EditIcon fontSize={'small'}/>
                        </IconButton>
                        <IconButton aria-label={'delete'} size={'small'}
                                    onClick={onDeletePackClick}
                                    disabled={status === 'loading'}>
                            <DeleteIcon fontSize={'small'}/>
                        </IconButton>
                    </Stack>
                    :
                    <Stack direction={'row'} alignItems={'flex-start'} spacing={1}>
                        <IconButton aria-label={'delete'} size={'small'}
                                    onClick={() => onLearnPackClick(pack._id)}
                                    disabled={pack.cardsCount === 0 || status === 'loading'}>
                            <SchoolIcon fontSize={'small'}/>
                        </IconButton>
                    </Stack>}
                <BasicModal open={userModal} setOpen={setUserModal}>
                    <ViewedUser id={pack.user_id} navigateBack={handleCloseUserModal}/>
                </BasicModal>
            </TableCell>
        </TableRow>
    )
}