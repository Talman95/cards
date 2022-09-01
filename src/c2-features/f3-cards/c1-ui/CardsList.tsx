import React, {FC} from 'react';
import {
    Box,
    Button,
    IconButton,
    Paper, Rating,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../c1-main/m1-ui/routes/MyRoutes";

export const CardsList: FC = () => {
    const navigate = useNavigate()
    const navigateToPacksList = () => {
        navigate(PATH.PACKS)
    }

    return (
        <Box style={{width: '800px'}}>
            <Box>
                <IconButton aria-label={'delete'} size={'small'} onClick={navigateToPacksList}>
                    <KeyboardBackspaceIcon fontSize={'small'}/>
                    Back Packs List
                </IconButton>
            </Box>
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
                <Typography variant={'h6'}>Pack Name</Typography>
                <Button variant={'contained'}>
                    Add new card
                </Button>
            </Box>
            <Box>
                <Typography variant={'body2'}>
                    Search
                </Typography>
                <TextField size={'small'} fullWidth/>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label={'simple table'}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'left'}>Question</TableCell>
                            <TableCell align={'left'}>Answer</TableCell>
                            <TableCell align={'left'}>Last Updated</TableCell>
                            <TableCell align={'left'}>Grade</TableCell>
                            <TableCell align={'left'}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            hover
                        >
                            <TableCell component={'th'} scope={'row'} align={'left'}>
                                first question
                            </TableCell>
                            <TableCell align={'left'}>first answer</TableCell>
                            <TableCell align={'left'}>12.03.22</TableCell>
                            <TableCell align={'left'}>
                                <Rating name={'read-only'} value={4} readOnly size={'small'} precision={0.5}/>
                            </TableCell>
                            <TableCell align={'left'} style={{width: '70px'}}>
                                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                    <IconButton aria-label={'delete'} size={'small'}>
                                        <EditIcon fontSize={'small'}/>
                                    </IconButton>
                                    <IconButton aria-label={'delete'} size={'small'}>
                                        <DeleteIcon fontSize={'small'}/>
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}