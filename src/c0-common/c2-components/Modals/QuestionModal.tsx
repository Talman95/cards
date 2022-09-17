import React, {FC} from 'react';
import {Box, Button, Divider, Grid, IconButton, Stack, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}

type QuestionModalType = {
    title: string
    itemName: string
    itemId: string
    navigateBack: () => void
    deleteItem: (id: string) => void
}

export const QuestionModal: FC<QuestionModalType> = (
    {
        title,
        itemName,
        itemId,
        navigateBack,
        deleteItem,
    }) => {

    const deleteItemHandler = () => {
        deleteItem(itemId)
    }

    return (
        <Box sx={style}>
            <Grid container alignItems={'center'}>
                <Grid item xs>
                    <Typography id={'title'} variant={'h6'} component={'h2'}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={navigateBack}>
                        <CloseIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <Divider/>
            <Typography>
                Do you really want to remove <strong>{itemName}</strong>?
            </Typography>
            <Typography>
                All cards will be deleted.
            </Typography>
            <Stack direction="row" spacing={2} style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button
                    variant="outlined"
                    onClick={navigateBack}
                    style={{width: 150, height: 55}}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color={'error'}
                    onClick={deleteItemHandler}
                    style={{width: 150, height: 55}}
                >
                    Delete
                </Button>
            </Stack>
        </Box>
    );
}