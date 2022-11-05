import React, {FC} from 'react';
import {Avatar, TableCell, TableRow} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {UserType} from "../../../../api/usersAPI";
import {blue} from '@mui/material/colors';
import {useAppSelector} from "../../../../hooks/hooks";
import {modalType} from "../../../../enums/modalType";
import {ShowUserModalType} from "../../../../store/Modal/modalSlice";
import {useActions} from "../../../../hooks/useActions";

export const UsersTableRow: FC<{ user: UserType }> = ({user}) => {

    const {setModalOpen} = useActions()

    const status = useAppSelector(state => state.app.status)

    const onShowUserModalClick = () => {
        if (status === 'loading') return

        setModalOpen({
            type: modalType.SHOW_USER,
            data: {
                id: user._id
            } as ShowUserModalType
        })
    }

    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            hover
        >
            <TableCell align={'left'} style={{width: '100px', cursor: 'pointer'}}
                       onClick={onShowUserModalClick}>
                <Avatar
                    sx={{width: 60, height: 60, bgcolor: blue[500]}}
                    alt={user.name}
                    src={user.avatar || ''}
                />
            </TableCell>
            <TableCell component={'th'} scope={'row'} align={'left'}
                       onClick={onShowUserModalClick}
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
        </TableRow>
    )
}