import React from "react";
import {HashRouter as Router} from 'react-router-dom' //uzywamy tylko gdy mamy routing po stronie klienta
import StoreProvider from "./store/storeProvider";
import Header from "./components/Header/Header";
import AsideMenu from './components/AsideMenu/AsideMenu'
import Content from './components/Content/Content'

import './App.scss';
const App = () =>(
    <StoreProvider>
        <Header />
            <Router>
                <div className="content-wrapper">
                    <AsideMenu />
                    <Content />
                </div>
            </Router>
    </StoreProvider>
)
export default App