import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";

import authReducer from "./store/reducers/auth";
import activationReducer from "./store/reducers/activation";

import "bootstrap/dist/css/bootstrap.css";

// axios.defaults.baseURL = "http://127.0.0.1:8001";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

// axios.interceptors.request.use(
//     request => {
//         console.log(request);
//         // Edit request config
//         return request;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject(error);
//     }
// );

// axios.interceptors.response.use(
//     response => {
//         console.log(response);
//         // Edit request config
//         return response;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject(error);
//     }
// );

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    activation: activationReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
