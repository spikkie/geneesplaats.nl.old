import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as jwt_decode from "jwt-decode";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, refreshToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        access: token,
        refresh: refreshToken
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("is_gk");
    localStorage.removeItem("is_tz");

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = (id, email, is_gk, is_tz) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        userId: id,
        email: email,
        is_gk: is_gk,
        is_tz: is_tz
    };
};

export const signupFail = error => {
    console.log("signupFail signupFail signupFail ", error);
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
};

export const authResetMessage = () => {
    return {
        type: actionTypes.AUTH_RESET_MESSAGE,
        error: null,
        message: null
    };
};

export const authSetNotifiedError = () => {
    return {
        type: actionTypes.AUTH_SET_NOTIFIED_ERROR,
        notifiedMessage: true
    };
};

export const authResetNotifiedError = () => {
    return {
        type: actionTypes.AUTH_RESET_NOTIFIED_ERROR,
        notifiedMessage: false
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

export const signup = (name, email, password, re_password) => {
    return dispatch => {
        dispatch(signupStart());
        let signupData = {};
        signupData = {
            name: name,
            email: email,
            password: password,
            re_password: re_password
        };

        const url = "/api/v1/auth/users/";
        axios
            .post(url, signupData)
            .then(response => {
                console.log(response);
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("is_gk", response.data.is_gk);
                localStorage.setItem("is_tz", response.data.is_tz);
                localStorage.setItem("userId", response.data.id);
                dispatch(
                    signupSuccess(
                        response.data.id,
                        response.data.email,
                        response.data.is_gk,
                        response.data.is_tz
                    )
                );
                dispatch(setRedirectAfterSignedup());
            })
            .catch(err => {
                console.log("[Auth] signup %0", err);
                dispatch(signupFail(err));
                dispatch(resetRedirectAfterSignedup());
                // dispatch(signupFail(err.response.data));
                // dispatch(signupFail(err.response.data.password[0]));
                // dispatch(signupFail(err.response.data.password[0]));
                //
                // "Proxy error: Could not proxy request /api/v1/auth/users/ from localhost:3000 to http://django:8001 (EAI_AGAIN)."
            });
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        let authData = {};
        authData = {
            email: email,
            password: password
        };

        const url = "/api/v1/accounts/jwt/create/";
        axios
            .post(url, authData)
            .then(response => {
                console.log(response);
                var decoded = jwt_decode(response.data.access);
                console.log(decoded.exp);
                localStorage.setItem("token", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                localStorage.setItem("expirationDate", decoded.exp);
                dispatch(
                    authSuccess(response.data.access, response.data.refresh)
                );
                dispatch(checkAuthTimeout(decoded.exp));
            })
            .catch(err => {
                //dispatch(authFail(err.response.data.error));
                dispatch(authFail(err));
                // todo
            });
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const setSignupRedirectPath = path => {
    console.log(
        "[Auth] setSignupRedirectPath return actionTypes.SET_SIGNUP_REDIRECT_PATH,"
    );
    return {
        type: actionTypes.SET_SIGNUP_REDIRECT_PATH,
        path: path
    };
};

export const setRedirectAfterSignedup = () => {
    return {
        type: actionTypes.SET_REDIRECT_AFTER_SIGNUP
    };
};

export const resetRedirectAfterSignedup = () => {
    return {
        type: actionTypes.RESET_REDIRECT_AFTER_SIGNUP
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
                localStorage.getItem("expirationDate") <= new Date().getTime()
            ) {
                console.log("expirationDate <= new Date");
                dispatch(logout());
            } else {
                console.log("NOT expirationDate <= new Date");
                dispatch(authSuccess(token, refreshToken));
                dispatch(
                    checkAuthTimeout(
                        localStorage.getItem("expirationDate") -
                            new Date().getTime()
                    )
                );
            }
        }
    };
};
