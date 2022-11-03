import React, {useEffect} from 'react';
import {useAppSelector} from "../hooks/hooks";
import {Header} from "../components/Header/Header";
import {RoutesPage} from "../routes/RoutesPage";
import {CircularProgress} from "@mui/material";
import {useActions} from "../hooks/useActions";
import {MessageSnackbar} from "../components/MessageSnackbar/MessageSnackbar";
import {Chat} from "../components/Chat/Chat";
import {Modals} from "../pages/Modals/Modals";

const App = () => {
    const {getAuthData} = useActions()

    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        getAuthData()
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <MessageSnackbar/>
            <Header/>
            <RoutesPage/>
            {isLoggedIn && <Chat/>}
            <Modals/>
        </div>
    )
}

export default App