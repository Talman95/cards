import React, {ChangeEvent, FC, useState} from 'react';
import {Navigate} from "react-router-dom";
import {logout} from "../../a1-login/l2-bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";
import {updateProfile} from "../p2-bll/profileReducer";

export const Profile: FC = () => {
    const profile = useAppSelector(state => state.profile.profile)
    const dispatch = useAppDispatch()
    const logoutHandler = () => dispatch(logout())
    const [name, setName] = useState<string>(profile?.name || '')
    const [editMode, setEditMode] = useState(false)
    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        dispatch(updateProfile({name: name}))
        setEditMode(false)
    }

    if (!profile) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            Profile
            <p>
                Name: {editMode
                ? <input value={name} onBlur={offEditMode} onChange={changeNameHandler} autoFocus/>
                : <span onDoubleClick={onEditMode}>{profile.name}</span>}
            </p>
            <p>Avatar: {profile.avatar}</p>
            <p>Card: {profile.publicCardPacksCount}</p>
            <button onClick={logoutHandler}>Log Out</button>
        </div>
    )
};