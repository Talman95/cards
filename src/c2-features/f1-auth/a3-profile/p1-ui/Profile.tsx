import React, {FC} from 'react';
import {Navigate} from "react-router-dom";
import {logout} from "../../a1-login/l2-bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";

export const Profile: FC = () => {
    const profile = useAppSelector(state => state.profile.profile)
    const dispatch = useAppDispatch()
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