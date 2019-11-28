import React from 'react';
import { ChildRoutes } from "../../router";

export default class Main extends React.Component {
    render() {
        return (
            <main className="app-main" id="main">
                <ChildRoutes/>
            </main>
        );
    }
};
