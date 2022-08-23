import React, {useEffect} from 'react';
import {MyRoutes} from "./routes/MyRoutes";
import {Header} from "./header/Header";
import {useDispatch, useSelector} from "react-redux";
import {getAuthData} from "../../../c2-features/f1-auth/a1-login/l2-bll/authReducer";
import {RootStateType} from "../../m2-bll/store";
import {ProfileType} from "../../../c2-features/f1-auth/a1-login/l3-dal/authAPI";

export const Main = () => {
    const profile = useSelector<RootStateType, ProfileType | null>(state => state.profile.profile)
    const dispatch = useDispatch<any>()

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