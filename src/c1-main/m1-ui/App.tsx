import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../c0-common/c1-hooks/hooks";
import {Header} from "./header/Header";
import {getAuthData} from "../../c2-features/f1-auth/a1-login/l2-bll/authReducer";
import {RoutesPage} from "./routes/RoutesPage";
import {ErrorSnackbar} from "../../c0-common/c2-components/c1-ErrorSnackbar/ErrorSnackbar";
import {CircularProgress} from "@mui/material";
import {SuccessSnackbar} from "../../c0-common/c2-components/c2-SuccessSnackbar/SuccessSnackbar";

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