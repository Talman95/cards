import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../c1-main/m2-bll/store";
import {ProfileType} from "../../a1-login/l3-dal/authAPI";
import {Navigate} from "react-router-dom";

export const Profile: FC = () => {
    const profile = useSelector<RootStateType, ProfileType | null>(state => state.profile.profile)

    if (!profile) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            Profile
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Card: {profile.publicCardPacksCount}</p>
        </div>
    )
};