import React from 'react';
import {MyRoutes} from "./routes/MyRoutes";
import {Header} from "./header/Header";

export const Main = () => {
    return (
        <>
            <Header/>
            <MyRoutes/>
        </>
    )
};