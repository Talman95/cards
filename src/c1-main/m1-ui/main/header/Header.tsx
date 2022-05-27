import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from "../routes/MyRoutes";
import s from './Header.module.css';

export const Header = () => {
    return (
        <div className={s.header}>
            <NavLink to={PATH.LOGIN}>LOGIN</NavLink>
            <NavLink to={PATH.REGISTER}>REGISTER</NavLink>
            <NavLink to={PATH.PROFILE}>PROFILE</NavLink>
            <NavLink to={PATH.FORGOT_PASSWORD}>FORGOT PASSWORD</NavLink>
            <NavLink to={PATH.SET_NEW_PASSWORD}>SET NEW PASSWORD</NavLink>
            <NavLink to={PATH.TEST}>TEST</NavLink>
        </div>
    )
};