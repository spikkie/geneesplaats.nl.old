import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    error: null,
    loading: false,
    activated: false
};

const activationStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const activationSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        activated: true
    });
};

const activationFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACTIVATION_START:
            return activationStart(state, action);
        case actionTypes.ACTIVATION_SUCCESS:
            return activationSuccess(state, action);
        case actionTypes.ACTIVATION_FAIL:
            return activationFail(state, action);
        default:
            return state;
    }
};

export default reducer;
