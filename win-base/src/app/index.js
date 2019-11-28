import React from 'react';
import Header from "./components/Header";
import Menu from "./components/Menu";
import Main from "./components/Main";
import Footer from "./components/Footer";

import './css/app.css';

export default class extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
                <Menu />
                <Main />
                <Footer />
            </div>
        )
    }
}
