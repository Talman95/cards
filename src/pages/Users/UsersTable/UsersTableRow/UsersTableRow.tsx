import React, {FC, useState} from 'react';
import {Avatar, TableCell, TableRow} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {UserType} from "../../../../api/usersAPI";
import {blue} from '@mui/material/colors';
import {BasicModal} from "../../../../components/BasicModal/BasicModal";
import {ViewedUser} from "../../ViewedUser/ViewedUser";
import {useAppSelector} from "../../../../hooks/hooks";

export const UsersTableRow: FC<{ user: UserType }> = ({user}) => {
    const [userModal, setUserModal] = useState(false)

    const status = useAppSelector(state => state.app.status)

    const handleOpenUserModal = () => {
        if (status === 'loading') return
        setUserModal(true)
    }
    const handleCloseUserModal = () => {
        setUserModal(false)
    }

    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            hover
        >
            <TableCell align={'left'} style={{width: '100px', cursor: 'pointer'}}
                       onClick={handleOpenUserModal}>
                <Avatar
                    sx={{width: 60, height: 60, bgcolor: blue[500]}}
                    alt={user.name}
                    src={user.avatar || ''}
                />
            </TableCell>
            <TableCell component={'th'} scope={'row'} align={'left'}
                       onClick={handleOpenUserModal}
                       style={{
                           cursor: 'pointer',
                           maxWidth: '268px',
                           textOverflow: 'ellipsis',
                           whiteSpace: 'nowrap',
                           overflow: 'hidden',
                       }}>
                {user.name}
            </TableCell>
            <TableCell align={'left'}>
                {user.publicCardPacksCount}
            </TableCell>
            <TableCell align={'left'}>
                {new Date(user.updated).toLocaleString()}
            </TableCell>
            <TableCell component={'th'} scope={'row'} align={'left'}>
                {new Date(user.created).toLocaleString()}
            </TableCell>
            <TableCell component={'th'} scope={'row'} align={'left'} style={{display: 'flex', alignItems: 'center'}}>
                {user.verified &&
                    <CheckCircleIcon fontSize={'small'} color={'primary'}/>}
            </TableCell>
            <BasicModal open={userModal} setOpen={setUserModal}>
                <ViewedUser id={user._id} navigateBack={handleCloseUserModal}/>
            </BasicModal>
        </TableRow>
    )
}