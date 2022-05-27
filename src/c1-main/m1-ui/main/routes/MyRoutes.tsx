import React from 'react';
import {Navigate, Routes, Route} from "react-router-dom";
import {Test} from "../../../../c2-features/f0-test/t1-ui/Test";
import {Login} from "../../../../c2-features/f1-auth/a1-login/l1-ui/Login";
import {Register} from "../../../../c2-features/f1-auth/a2-register/r1-ui/Register";
import {Profile} from "../../../../c2-features/f1-auth/a3-profile/p1-ui/Profile";
import {Forgot} from "../../../../c2-features/f1-auth/a4-forgot/f1-ui/Forgot";
import {SetPass} from "../../../../c2-features/f1-auth/a5-setPass/s1-ui/SetPass";

export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    FORGOT_PASSWORD: '/forgot',
    SET_NEW_PASSWORD: '/set-new-password',
    TEST: '/test',
}

export const MyRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTER} element={<Register/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.FORGOT_PASSWORD} element={<Forgot/>}/>
                <Route path={PATH.SET_NEW_PASSWORD} element={<SetPass/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path={'*'} element={<div>ERROR 404</div>}/>
            </Routes>
        </>
    )
};