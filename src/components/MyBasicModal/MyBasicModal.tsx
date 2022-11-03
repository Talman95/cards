import React, {FC} from 'react';
import Modal from '@mui/material/Modal';
import {Box, Grid, IconButton, Typography} from "@mui/material";
import {useActions} from "../../hooks/useActions";
import CloseIcon from "@mui/icons-material/Close";

type PropsType = {
    type: null | string
    children: JSX.Element
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
}

export const MyBasicModal: FC<PropsType> = ({type, children}) => {
    const {setModalClose} = useActions()

    const onCloseClick = () => {
        setModalClose()
    }

    return (
        <Modal
            open={!!type}
            onClose={onCloseClick}
        >
            <Box sx={style}>
                <Grid container alignItems={'center'} style={{marginBottom: '10px'}}>
                    <Grid item xs>
                        <Typography id={'title'} variant={'h6'} component={'h2'}>
                            {type}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={onCloseClick}>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                {children}
            </Box>
        </Modal>
    );
}