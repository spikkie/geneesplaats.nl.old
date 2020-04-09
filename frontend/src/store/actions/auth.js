import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as jwt_decode from "jwt-decode";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, refreshToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        access: token,
        refresh: refreshToken,
        userId: userId
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    console.log("export const logout ");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    console.log("expirationTime", expirationTime);
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

// export const auth = (name, email, password, password2, isSignup) => {
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        let authData = {};
        if (!isSignup) {
            authData = {
                email: email,
                password: password
            };
        } else {
            const authData = {
                // name: name,
                email: email,
                password: password
                // password2: password2
            };
        }

        let url = "/api/v1/auth/users/";
        if (!isSignup) {
            url = "/api/v1/accounts/jwt/create/";
        }
        axios
            .post(url, authData)
            .then(response => {
                console.log(response);
                var decoded = jwt_decode(response.data.access);
                console.log(decoded.exp);
                localStorage.setItem("token", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                localStorage.setItem("expirationDate", decoded.exp);
                localStorage.setItem("userId", response.data.localId);
                dispatch(
                    authSuccess(
                        response.data.access,
                        response.data.refresh,
                        response.data.localId
                    )
                );
                dispatch(checkAuthTimeout(decoded.exp));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        console.log("authCheckState ", token);
        const refreshToken = localStorage.getItem("refreshToken");
        if (!token) {
            console.log("LOGOUT");
            dispatch(logout());
        } else {
            if (
                localStorage.getItem("expirationDate") <=
                new Date().getTime() / 1000
            ) {
                console.log("expirationDate <= new Date");
                dispatch(logout());
            } else {
                console.log("NOT expirationDate <= new Date");
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, refreshToken, userId));
                dispatch(
                    checkAuthTimeout(
                        localStorage.getItem("expirationDate") -
                            new Date().getTime() / 1000
                    )
                );
            }
        }
    };
};
