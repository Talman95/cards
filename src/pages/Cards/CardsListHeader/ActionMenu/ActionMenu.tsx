import {IconButton, Stack} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../../hooks/hooks";

type PropsType = {
    blocked: boolean
    showUpdateModal: () => void
    showDeleteModal: () => void
    closeTooltip: () => void
}

export const ActionMenu: FC<PropsType> = (
    {
        blocked, showUpdateModal,
        showDeleteModal, closeTooltip,
    }) => {

    const navigate = useNavigate()

    const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)

    const onLearnPackClick = () => {
        closeTooltip()
        navigate('/learn/' + cardsPack_id)
    }
    const onUpdatePackClick = () => {
        closeTooltip()
        showUpdateModal()
    }
    const onDeletePackClick = () => {
        closeTooltip()
        showDeleteModal()
    }

    return (
        <Stack direction={'column'} alignItems={'flex-start'} justifyContent={'center'} spacing={1}>
            <IconButton size={'small'}
                        onClick={onLearnPackClick}
                        disabled={blocked}
            >
                <SchoolIcon fontSize={'small'}/>
            </IconButton>
            <IconButton size={'small'}
                        onClick={onUpdatePackClick}
            >
                <EditIcon fontSize={'small'}/>
            </IconButton>
            <IconButton size={'small'}
                        onClick={onDeletePackClick}
            >
                <DeleteIcon fontSize={'small'}/>
            </IconButton>
        </Stack>
    )
}