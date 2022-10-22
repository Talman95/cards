import React, {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Forgot, Login, Register, SetPassword} from "../pages/Auth";
import {Profile} from "../pages/Profile/Profile";
import {Container} from "@mui/material";
import {Packs} from "../pages/Packs/Packs";
import {CardsList} from "../pages/Cards/CardsList";
import {LearnList} from "../pages/Learn/LearnList";
import {PrivateRoutes} from "./PrivateRoutes";
import {Users} from "../pages/Users/Users";

export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    FORGOT_PASSWORD: '/forgot',
    SET_NEW_PASSWORD: '/set-new-password/:token',
    TEST: '/test',
    PACKS: '/packs',
    CARDS: '/cards/:id',
    LEARN: '/learn/:cardsPack_id',
    USERS: '/users',
}

export const RoutesPage: FC = () => {
    const routes = [
        {path: PATH.LOGIN, component: <Login/>},
        {path: PATH.REGISTER, component: <Register/>},
        {path: PATH.FORGOT_PASSWORD, component: <Forgot/>},
        {path: PATH.SET_NEW_PASSWORD, component: <SetPassword/>},
        {path: '*', component: <div>ERROR 404</div>},
    ]
    const protectedRoutes = [
        {path: PATH.PROFILE, component: <Profile/>},
        {path: PATH.PACKS, component: <Packs/>},
        {path: PATH.CARDS, component: <CardsList/>},
        {path: PATH.LEARN, component: <LearnList/>},
        {path: PATH.USERS, component: <Users/>},
    ]


    return (
        <Container fixed style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>

                {routes.map(({path, component}) => (
                    <Route key={path} path={path} element={component}/>
                ))}

                <Route element={<PrivateRoutes/>}>
                    {protectedRoutes.map(({path, component}) => (
                        <Route key={path} path={path} element={component}/>
                    ))}
                </Route>
            </Routes>
        </Container>
    )
}