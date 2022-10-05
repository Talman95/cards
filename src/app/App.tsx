import React, {useEffect} from 'react';
import {useAppSelector} from "../hooks/hooks";
import {Header} from "../components/header/Header";
import {RoutesPage} from "../components/routes/RoutesPage";
import {CircularProgress} from "@mui/material";
import {useActions} from "../hooks/useActions";
import {MessageSnackbar} from "../components/MessageSnackbar/MessageSnackbar";

const App = () => {
    const {getAuthData} = useActions()

    const isInitialized = useAppSelector(state => state.app.isInitialized)

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
        </div>
    )
}

export default App;