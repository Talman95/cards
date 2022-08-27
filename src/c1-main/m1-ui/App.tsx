import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../c0-common/c1-hooks/hooks";
import {Header} from "./header/Header";
import {getAuthData} from "../../c2-features/f1-auth/a1-login/l2-bll/authReducer";
import {MyRoutes} from "./routes/MyRoutes";
import {ErrorSnackbar} from "../../c0-common/c2-components/c1-ErrorSnackbar/ErrorSnackbar";
import {CircularProgress} from "@mui/material";

const App = () => {
    const profile = useAppSelector(state => state.profile.profile)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!profile) {
            dispatch(getAuthData())
        }
    }, [dispatch, profile])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <ErrorSnackbar/>
            <Header/>
            <MyRoutes/>
        </div>
    )
};

export default App;