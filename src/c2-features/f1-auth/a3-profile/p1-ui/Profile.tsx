import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../../c1-main/m2-bll/store";
import {ProfileType} from "../../a1-login/l3-dal/authAPI";
import {Navigate} from "react-router-dom";
import {logout} from "../../a1-login/l2-bll/authReducer";

export const Profile: FC = () => {
    const profile = useSelector<RootStateType, ProfileType | null>(state => state.profile.profile)
    const dispatch = useDispatch<any>()
    const logoutHandler = () => dispatch(logout())

    if (!profile) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            Profile
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Card: {profile.publicCardPacksCount}</p>
            <button onClick={logoutHandler}>Log Out</button>
        </div>
    )
};