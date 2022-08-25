import React, {useEffect} from 'react';
import {MyRoutes} from "./routes/MyRoutes";
import {Header} from "./header/Header";
import {getAuthData} from "../../../c2-features/f1-auth/a1-login/l2-bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";

export const Main = () => {
    const profile = useAppSelector(state => state.profile.profile)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!profile) {
            dispatch(getAuthData())
        }
    }, [dispatch, profile])

    return (
        <>
            <Header/>
            <MyRoutes/>
        </>
    )
};