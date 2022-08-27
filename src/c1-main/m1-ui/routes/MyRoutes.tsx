import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../../c2-features/f1-auth/a1-login/l1-ui/Login";
import {Register} from "../../../c2-features/f1-auth/a2-register/r1-ui/Register";
import {Profile} from "../../../c2-features/f1-auth/a3-profile/p1-ui/Profile";
import {Forgot} from "../../../c2-features/f1-auth/a4-forgot/f1-ui/Forgot";
import {SetPassword} from "../../../c2-features/f1-auth/a5-setPassword/s1-ui/SetPassword";
import {Container} from "@mui/material";

export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    FORGOT_PASSWORD: '/forgot',
    SET_NEW_PASSWORD: '/set-new-password/:token',
    TEST: '/test',
}

export const MyRoutes = () => {
    return (
        <Container fixed style={{display: 'flex', justifyContent:'center'}}>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTER} element={<Register/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.FORGOT_PASSWORD} element={<Forgot/>}/>
                <Route path={PATH.SET_NEW_PASSWORD} element={<SetPassword/>}/>
                <Route path={'*'} element={<div>ERROR 404</div>}/>
            </Routes>
        </Container>
    )
};