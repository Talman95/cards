import React, {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../../c2-features/f1-auth/a1-login/l1-ui/Login";
import {Register} from "../../../c2-features/f1-auth/a2-register/r1-ui/Register";
import {Profile} from "../../../c2-features/f1-auth/a3-profile/p1-ui/Profile";
import {Forgot} from "../../../c2-features/f1-auth/a4-forgot/f1-ui/Forgot";
import {SetPassword} from "../../../c2-features/f1-auth/a5-setPassword/s1-ui/SetPassword";
import {Container} from "@mui/material";
import {PacksList} from "../../../c2-features/f2-packs/p1-ui/PacksList";
import {CardsList} from "../../../c2-features/f3-cards/c1-ui/CardsList";

export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    FORGOT_PASSWORD: '/forgot',
    SET_NEW_PASSWORD: '/set-new-password/:token',
    TEST: '/test',
    PACKS: '/packs',
    CARDS: '/packs/cards',
}

export const RoutesPage: FC = () => {
    const routes = [
        {path: PATH.LOGIN, component: <Login/>},
        {path: PATH.REGISTER, component: <Register/>},
        {path: PATH.PROFILE, component: <Profile/>},
        {path: PATH.FORGOT_PASSWORD, component: <Forgot/>},
        {path: PATH.SET_NEW_PASSWORD, component: <SetPassword/>},
        {path: PATH.PACKS, component: <PacksList/>},
        {path: PATH.CARDS, component: <CardsList/>},
        {path: '*', component: <div>ERROR 404</div>},
    ]
    return (
        <Container fixed style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>
                {routes.map(({path, component}) => (
                    <Route key={path} path={path} element={component}/>
                ))}
            </Routes>
        </Container>
    )
};