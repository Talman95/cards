import React, {FC} from 'react';
import {IconButton, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {PackType, UpdatePackType} from "../../p3-dal/packsAPI";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";
import {deletePack, updatePack} from "../../p2-bll/packsReducer";
import {setCardPackId} from "../../../f3-cards/c2-bll/cardsReducer";
import {PATH} from "../../../../c1-main/m1-ui/routes/RoutesPage";
import {useNavigate} from "react-router-dom";

type PacksTableBodyType = {
    cardPacks: PackType[]
}

export const PacksTableBody: FC<PacksTableBodyType> = ({cardPacks}) => {
    console.log('body body body body')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user_id = useAppSelector(state => state.profile.profile?._id)
    const deletePackHandler = (id: string) => {
        dispatch(deletePack(id))
    }
    const updatePackHandler = (_id: string) => {
        const pack: UpdatePackType = {
            _id,
            name: 'Update Pack',
            isPrivate: true,
        }
        dispatch(updatePack(pack))
    }
    const navigateToCardsList = async (id: string) => {
        await dispatch(setCardPackId(id))
        navigate(PATH.CARDS)
    }

    return (
        <TableBody>
            {cardPacks.map((p) => (
                <TableRow
                    key={p._id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    hover
                >
                    <TableCell component={'th'} scope={'row'} align={'left'}
                               onClick={() => navigateToCardsList(p._id)}
                               style={{cursor: 'pointer'}}
                    >
                        {p.name}
                    </TableCell>
                    <TableCell align={'left'}>{p.cardsCount}</TableCell>
                    <TableCell align={'left'}>{new Date(p.updated).toLocaleString()}</TableCell>
                    <TableCell align={'left'}>{p.user_name}</TableCell>
                    <TableCell align={'left'} style={{width: '100px'}}>
                        {user_id === p.user_id
                            ?
                            <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                <IconButton aria-label={'learn'} size={'small'}>
                                    <SchoolIcon fontSize={'small'}/>
                                </IconButton>
                                <IconButton aria-label={'update'} size={'small'}
                                            onClick={() => updatePackHandler(p._id)}>
                                    <EditIcon fontSize={'small'}/>
                                </IconButton>
                                <IconButton aria-label={'delete'} size={'small'}
                                            onClick={() => deletePackHandler(p._id)}>
                                    <DeleteIcon fontSize={'small'}/>
                                </IconButton>
                            </Stack>
                            :
                            <Stack direction={'row'} alignItems={'flex-start'} spacing={1}>
                                <IconButton aria-label={'delete'} size={'small'}>
                                    <SchoolIcon fontSize={'small'}/>
                                </IconButton>
                            </Stack>}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}