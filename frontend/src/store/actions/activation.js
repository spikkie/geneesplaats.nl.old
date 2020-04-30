import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as jwt_decode from "jwt-decode";

export const activationStart = () => {
    return {
        type: actionTypes.ACTIVATION_START
    };
};

export const activationSuccess = (uid, token) => {
    return {
        type: actionTypes.ACTIVATION_SUCCESS,
        error: null,
        loading: false,
        activated: true
    };
};

export const activationFail = error => {
    return {
        type: actionTypes.ACTIVATION_FAIL,
        error: error,
        loading: false
    };
};

export const activation = (uid, token) => {
    return dispatch => {
        dispatch(activationStart());
        let activationData = {};
        activationData = {
            uid: uid,
            token: token
        };

        console.log(
            "[Actions Activation] BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB %0 ",
            activationData
        );
        const url = "/api/v1/auth/users/activation/";
        axios
            .post(url, activationData)
            .then(response => {
                console.log("[Actions Activation] %0", response);
                localStorage.setItem("uid", response.data.uid);
                localStorage.setItem("token", response.data.token);
                dispatch(
                    activationSuccess(response.data.uid, response.data.token)
                );
            })
            .catch(err => {
                dispatch(activationFail(err));
            });
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};
