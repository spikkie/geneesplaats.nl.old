import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    refreshToken: null,
    userId: null,
    loading: false,
    authRedirectPath: "/",
    signupRedirectPath: "/",
    redirectAfterSignedup: false,

    error: null,
    message: null,
    notifiedMessage: false
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, message: null, loading: true });
};

const signupStart = (state, action) => {
    return updateObject(state, { error: null, message: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.access,
        refreshToken: action.refresh,
        message: action.response,
        loading: false
    });
};

const signupSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.id,
        message: action.response,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authResetMessage = (state, action) => {
    return updateObject(state, {
        error: null,
        message: null
    });
};

const authSetNotifiedMessage = (state, action) => {
    return updateObject(state, {
        notifiedMessage: true
    });
};

const authResetNotifiedMessage = (state, action) => {
    return updateObject(state, {
        notifiedMessage: false
    });
};

const signupFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    console.log("authLogout set token null");
    return updateObject(state, {
        token: null,
        refreshToken: null,
        userId: null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
};

const setSignupRedirectPath = (state, action) => {
    return updateObject(state, { signupRedirectPath: action.path });
};

const setRedirectAfterSignedup = (state, action) => {
    return updateObject(state, { redirectAfterSignedup: true });
};

const resetRedirectAfterSignedup = (state, action) => {
    return updateObject(state, { redirectAfterSignedup: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);

        case actionTypes.AUTH_RESET_MESSAGE:
            return authResetMessage(state, action);

        case actionTypes.AUTH_SET_NOTIFIED_MESSAGE:
            return authSetNotifiedMessage(state, action);
        case actionTypes.AUTH_RESET_NOTIFIED_ERROR:
            return authResetNotifiedMessage(state, action);

        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);

        case actionTypes.SIGNUP_START:
            return signupStart(state, action);
        case actionTypes.SIGNUP_SUCCESS:
            return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL:
            return signupFail(state, action);
        case actionTypes.SET_SIGNUP_REDIRECT_PATH:
            return setSignupRedirectPath(state, action);
        case actionTypes.SET_REDIRECT_AFTER_SIGNUP:
            return setRedirectAfterSignedup(state, action);
        case actionTypes.RESET_REDIRECT_AFTER_SIGNUP:
            return resetRedirectAfterSignedup(state, action);
        default:
            return state;
    }
};

export default reducer;
