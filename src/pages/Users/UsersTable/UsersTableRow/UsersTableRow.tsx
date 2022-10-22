import React, {FC} from 'react';
import {Avatar, TableCell, TableRow} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const UsersTableRow: FC<{ user: any }> = ({user}) => {
    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            hover
        >
            <TableCell align={'left'} style={{width: '100px'}}>
                <Avatar
                    sx={{width: 60, height: 60}}
                    alt={'user'}
                    src={user.avatar}
                />
            </TableCell>
            <TableCell component={'th'} scope={'row'} align={'left'}
                       style={{
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
            <TableCell component={'th'} scope={'row'} align={'left'}>
                {user.verified &&
                    <CheckCircleIcon fontSize={'small'} color={'primary'}/>}
            </TableCell>
        </TableRow>
    )
}