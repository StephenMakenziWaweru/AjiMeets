import { updateObject } from '../utility';
import {
    LOGIN_START, LOGIN_FAIL, LOGIN_SUCCESS,
    REG_START, REG_FAIL, REG_SUCCESS,
    REQ_PASS_START, REQ_PASS_FAIL, REQ_PASS_SUCCESS,
    RETRIEVE_PROF_FAIL, RETRIEVE_PROF_START, RETRIEVE_PROF_SUCCESS,
    UPDATE_PROF_FAIL, UPDATE_PROF_START, UPDATE_PROF_SUCCESS,
    LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAIL, CLEAR_ERRORS,
    UPLOAD_START, UPLOAD_SUCCESS, UPLOAD_FAIL, TIMEZONE_START,
    TIMEZONE_SUCCESS, TIMEZONE_FAIL, MEETING_SECURITY_START,
    MEETING_SECURITY_SUCCESS, MEETING_SECURITY_FAIL
} from '../actions/authActionTypes';

const initialState = {
    loading: false,
    loginError: null,
    registerError: null,
    retrieveProfError: null,
    updateProfError: null,
    resetPassError: null,
    logoutError: null,
    reqPassSuccessMes: null,
    uploadError: null,
    timezoneError: null,
    meetingSecurityError: null
}

//Login actions
const loginStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};
const loginFail = (state, action) => {
    return updateObject(state, {
        loginError: action.err,
        loading: false
    });
};


//Registration actions 
const regStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const regSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};

const regFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        registerError: action.err

    });
};


//Request password actions
const reqPassStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const reqPassSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        reqPassSuccessMes: action.success
    });
};

const reqPassFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        resetPassError: action.err
    });
};


//Retrieve profile actions
const retrieveProfStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const retrieveProfSuccess = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};

const retrieveProfFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        retrieveProfError: action.err
    });
};


//Update profile actions
const updateProfStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const updateProfSuccess = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};

const updateProfFail = (state, action) => {
    return updateObject(state, {
        loading: true,
        updateProfError: action.err
    });
};

//logout actions
const logoutStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
};

const logoutSuccess = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};
const logoutFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        logoutError: action.err
    });
};

//upload actions
const uploadStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
};

const uploadSuccess = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};
const uploadFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        uploadError: action.err
    });
};

//timezone actions
const timezoneStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
};

const timezoneSuccess = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};
const timezoneFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        timezoneError: action.err
    });
};


const meetingSecurityStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const meetingSecuritySuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};
const meetingSecurityFail = (state, action) => {
    return updateObject(state, {
        meetingSecurityError: action.err,
        loading: false
    });
};



const clearErrors = (state, action) => {
    return updateObject(state, {
        loginError: null,
        registerError: null,
        retrieveProfError: null,
        updateProfError: null,
        resetPassError: null,
        logoutError: null,
        uploadError: null,
        timezoneError: null,
        meetingSecurityError: null
    });
};



// Auth reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return loginStart(state, action);
        case LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case LOGIN_FAIL:
            return loginFail(state, action);
        case REG_START:
            return regStart(state, action);
        case REG_SUCCESS:
            return regSuccess(state, action);
        case REG_FAIL:
            return regFail(state, action);
        case REQ_PASS_START:
            return reqPassStart(state, action);
        case REQ_PASS_SUCCESS:
            return reqPassSuccess(state, action);
        case REQ_PASS_FAIL:
            return reqPassFail(state, action);
        case RETRIEVE_PROF_START:
            return retrieveProfStart(state, action);
        case RETRIEVE_PROF_SUCCESS:
            return retrieveProfSuccess(state, action);
        case RETRIEVE_PROF_FAIL:
            return retrieveProfFail(state, action);
        case UPDATE_PROF_START:
            return updateProfStart(state, action);
        case UPDATE_PROF_SUCCESS:
            return updateProfSuccess(state, action);
        case UPDATE_PROF_FAIL:
            return updateProfFail(state, action);
        case LOGOUT_START:
            return logoutStart(state, action);
        case LOGOUT_SUCCESS:
            return logoutSuccess(state, action);
        case LOGOUT_FAIL:
            return logoutFail(state, action);
        case CLEAR_ERRORS:
            return clearErrors(state, action);
        case UPLOAD_START:
            return uploadStart(state, action);
        case UPLOAD_SUCCESS:
            return uploadSuccess(state, action);
        case UPLOAD_FAIL:
            return uploadFail(state, action);
        case TIMEZONE_START:
            return timezoneStart(state, action);
        case TIMEZONE_SUCCESS:
            return timezoneSuccess(state, action);
        case TIMEZONE_FAIL:
            return timezoneFail(state, action);
        case MEETING_SECURITY_START:
            return meetingSecurityStart(state, action);
        case MEETING_SECURITY_SUCCESS:
            return meetingSecuritySuccess(state, action);
        case MEETING_SECURITY_FAIL:
            return meetingSecurityFail(state, action);

        default:
            return state;
    }
};

export default authReducer