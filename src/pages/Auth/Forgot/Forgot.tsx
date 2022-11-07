import React, {FC, useState} from 'react';
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import {Grid} from "@mui/material";
import {CheckEmail} from "./CheckEmail/CheckEmail";
import {RecoveryPassword} from "./RecoveryPassword/RecoveryPassword";
import {path} from "../../../enums/path";

export const Forgot: FC = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const [isSend, setIsSend] = useState(false)
    const [email, setEmail] = useState('')

    const handleSendMessage = () => setIsSend(true)
    const handleSetEmail = (email: string) => setEmail(email)

    if (isLoggedIn) {
        return <Navigate to={path.PROFILE}/>
    }

    return (
        <Grid container justifyContent={'center'} style={{maxWidth: '250px'}}>
            {isSend
                ?
                <CheckEmail email={email}/>
                :
                <RecoveryPassword toSend={handleSendMessage} setEmail={handleSetEmail}/>
                }
        </Grid>
    )
}