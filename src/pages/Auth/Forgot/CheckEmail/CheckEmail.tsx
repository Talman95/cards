import React, {FC} from 'react';
import {Button, FormGroup, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {path} from "../../../../enums/path";

export const CheckEmail: FC<{email: string}> = ({email}) => {
    const navigate = useNavigate()

    const navigateToLogin = () => navigate(path.LOGIN)

    return (
        <Grid item justifyContent={'center'}>
            <FormGroup>
                <Typography variant="h6" style={{alignSelf: 'center', marginTop: '16px'}}>
                    Check Email
                </Typography>
                <Typography style={{margin: '16px 0'}}>
                    We've sent an Email with instructions to {email}
                </Typography>
                <Button variant={'contained'} color={'primary'} onClick={navigateToLogin}>
                    Back to login
                </Button>
            </FormGroup>
        </Grid>
    )
}