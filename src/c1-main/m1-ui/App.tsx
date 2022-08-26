import React from 'react';
import {Main} from "./main/Main";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../m2-bll/store";

const App = () => {
    return (
        <div>
            <HashRouter>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </HashRouter>
        </div>
    )
};

export default App;