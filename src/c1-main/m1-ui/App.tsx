import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../c0-common/c1-hooks/hooks";
import {Header} from "./header/Header";
import {getAuthData} from "../../c2-features/f1-auth/a1-login/l2-bll/authReducer";
import {MyRoutes} from "./routes/MyRoutes";
import {ErrorSnackbar} from "../../c0-common/c2-components/c1-ErrorSnackbar/ErrorSnackbar";

const App = () => {
    const profile = useAppSelector(state => state.profile.profile)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!profile) {
            dispatch(getAuthData())
        }
    }, [dispatch, profile])

    return (
        <div>
            <ErrorSnackbar/>
            <Header/>
            <MyRoutes/>
        </div>
    )
};

export default App;