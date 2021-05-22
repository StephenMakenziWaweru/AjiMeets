import { updateObject } from '../utility';
import {
    HOST_MEETING_START, HOST_MEETING_SUCCESS, HOST_MEETING_FAIL,
    SCHEDULE_MEETING_START, SCHEDULE_MEETING_SUCCESS, SCHEDULE_MEETING_FAIL,
    CLEAR_MEETING_ERRORS, END_MEETING_START, END_MEETING_SUCCESS, END_MEETING_FAIL,
    JOIN_MEETING_START, JOIN_MEETING_SUCCESS, JOIN_MEETING_FAIL
} from '../actions/meetingActionTypes';

const initialState = {
    loading: false,
    scheduledMeetings: [],
    allMeetings: [],
    scheduleError: null,
    hostError: null,
    meetingError: null,
    joinMeetingError: null,
}

//Host a meeting actions
const hostMeetingStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const hostMeetingSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};
const hostMeetingFail = (state, action) => {
    return updateObject(state, {
        hostError: action.err,
        loading: false
    });
};

//Schedule a meeting actions
const scheduleMeetingStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const scheduleMeetingSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};
const scheduleMeetingFail = (state, action) => {
    return updateObject(state, {
        scheduleError: action.err,
        loading: false
    });
};


//End a meeting actions
const endMeetingStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const endMeetingSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};
const endMeetingFail = (state, action) => {
    return updateObject(state, {
        meetingError: action.err,
        loading: false
    });
};


//Join a meeting actions
const joinMeetingStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const joinMeetingSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};
const joinMeetingFail = (state, action) => {
    return updateObject(state, {
        joinMeetingError: action.err,
        loading: false
    });
};


const clearMeetingErrors = (state, action) => {
    return updateObject(state, {
        hostError: null,
        scheduleError: null,
        meetingError: null

    });
};


// Meeting reducer
const meetingReducer = (state = initialState, action) => {
    switch (action.type) {
        case HOST_MEETING_START:
            return hostMeetingStart(state, action);
        case HOST_MEETING_SUCCESS:
            return hostMeetingSuccess(state, action);
        case HOST_MEETING_FAIL:
            return hostMeetingFail(state, action);
        case SCHEDULE_MEETING_START:
            return scheduleMeetingStart(state, action);
        case SCHEDULE_MEETING_SUCCESS:
            return scheduleMeetingSuccess(state, action);
        case SCHEDULE_MEETING_FAIL:
            return scheduleMeetingFail(state, action);
        case CLEAR_MEETING_ERRORS:
            return clearMeetingErrors(state, action);
        case END_MEETING_START:
            return endMeetingStart(state, action);
        case END_MEETING_SUCCESS:
            return endMeetingSuccess(state, action);
        case END_MEETING_FAIL:
            return endMeetingFail(state, action);
        case JOIN_MEETING_START:
            return joinMeetingStart(state, action);
        case JOIN_MEETING_SUCCESS:
            return joinMeetingSuccess(state, action);
        case JOIN_MEETING_FAIL:
            return joinMeetingFail(state, action);
        default:
            return state;
    }
};

export default meetingReducer



