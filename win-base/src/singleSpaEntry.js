import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { Routes } from "./router";
import _ from "lodash";

import "./theme/css/index.css";

if (!window.singleSpaNavigate) {
    ReactDOM.render(Routes, document.getElementById('root'))
}

const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: () => Routes,
    domElementGetter: () => document.getElementById('root')
});

export const bootstrap = [
    reactLifecycles.bootstrap
];

export const mount = [
    reactLifecycles.mount
];

export const unmount = [
    reactLifecycles.unmount
];