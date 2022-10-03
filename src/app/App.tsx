import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {Header} from "../components/header/Header";
import {RoutesPage} from "../components/routes/RoutesPage";
import {ErrorSnackbar} from "../components/snackbar/ErrorSnackbar/ErrorSnackbar";
import {CircularProgress} from "@mui/material";
import {SuccessSnackbar} from "../components/snackbar/SuccessSnackbar/SuccessSnackbar";
import {getAuthData} from "../store/Auth/asyncThunk";

const App = () => {
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAuthData())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <SuccessSnackbar/>
            <ErrorSnackbar/>
            <Header/>
            <RoutesPage/>
        </div>
    )
};

export default App;