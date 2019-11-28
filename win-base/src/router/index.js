import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from "../app";
import LoginView from "../page/login/view/loginView";
import HomeView from "../page/home/view/HomeView";

export const routeConfig = [
    {
        path: '/main',
        component: App
    },
    {
        path: '/login',
        component: LoginView,
        exact: true
    }
];

export const childRouteConfig = [
    {
        path: '/home',
        component: HomeView,
        exact: true
    }
];

export const Routes = (
    <HashRouter>
        <Switch>
            {
                routeConfig.map((route, index) => {
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component} />
                    )
                })
            }
            <Redirect from="/" to="/main" />
        </Switch>
    </HashRouter>
);

export const ChildRoutes = function () {
    return childRouteConfig.map((route, index) => {
        return (
            <Route
                key={index}
                path={"/main" + route.path}
                exact={route.exact}
                component={route.component} />

        )
    });
};

export default {
    routeConfig,
    childRouteConfig,
    Routes,
    ChildRoutes
};