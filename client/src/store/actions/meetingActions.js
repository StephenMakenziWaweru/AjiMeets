import {
    HOST_MEETING_START, HOST_MEETING_SUCCESS, HOST_MEETING_FAIL,
    SCHEDULE_MEETING_START, SCHEDULE_MEETING_SUCCESS, SCHEDULE_MEETING_FAIL,
    CLEAR_MEETING_ERRORS, END_MEETING_START, END_MEETING_SUCCESS, END_MEETING_FAIL,
    JOIN_MEETING_START, JOIN_MEETING_SUCCESS, JOIN_MEETING_FAIL
} from './meetingActionTypes';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import { message } from 'antd';

//host a meeting actions
const hostMeetingStart = () => {
    return {
        type: HOST_MEETING_START
    };
};

const hostMeetingSuccess = () => {
    return {
        type: HOST_MEETING_SUCCESS
    };
};
const hostMeetingFail = (err) => {
    return {
        type: HOST_MEETING_FAIL,
        err
    };
};

//Schedule a meeting actions
const scheduleMeetingStart = () => {
    return {
        type: SCHEDULE_MEETING_START
    };
};

const scheduleMeetingSuccess = () => {
    return {
        type: SCHEDULE_MEETING_SUCCESS
    };
};
const scheduleMeetingFail = (err) => {
    return {
        type: SCHEDULE_MEETING_FAIL,
        err
    };
};


//End a meeting actions
const endMeetingStart = () => {
    return {
        type: END_MEETING_START
    };
};

const endMeetingSuccess = () => {
    return {
        type: END_MEETING_SUCCESS
    };
};
const endMeetingFail = (err) => {
    return {
        type: END_MEETING_FAIL,
        err
    };
};


//Join a meeting actions
const joinMeetingStart = () => {
    return {
        type: JOIN_MEETING_START
    };
};

const joinMeetingSuccess = () => {
    return {
        type: JOIN_MEETING_SUCCESS
    };
};
const joinMeetingFail = (err) => {
    return {
        type: JOIN_MEETING_FAIL,
        err
    };
};




//Clear Meeting errors action
const clearMeetingErrors = () => {
    return {
        type: CLEAR_MEETING_ERRORS,
    };
};


export const clearAllErrors = () => {
    return dispatch => {
        dispatch(clearMeetingErrors());
    }

}

export const hostMeeting = (meeting) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch(hostMeetingStart());
        const profile = getState().firebase.profile;
        const hostId = getState().firebase.auth.uid;
        const firestore = getFirestore();
        firestore.collection('Meetings').doc(meeting.meetingId).set({
            hostFirstName: profile.firstName,
            hostLastName: profile.lastName,
            hostId: hostId,
            title: meeting.meetingTitle,
            meetingId: meeting.meetingId,
            status: "ongoing",
            createdAt: new Date()
        }).then(() => {
            dispatch(hostMeetingSuccess());
            meeting.push(`/meeting-room?name=${profile.firstName + ' ' + profile.lastName}&room=${meeting.meetingId}`)
        }).catch((err) => {
            dispatch(hostMeetingFail(err.message));
        })
    }
}

export const scheduleMeeting = (meeting) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch(scheduleMeetingStart());
        const profile = getState().firebase.profile;
        const hostId = getState().firebase.auth.uid;
        const firestore = getFirestore();
        firestore.collection('Meetings').doc(meeting.meetingId).set({
            title: meeting.meetingTitle,
            meetingId: meeting.meetingId,
            hostFirstName: profile.firstName,
            hostLastName: profile.lastName,
            scheduledDateTime: meeting.selectedDateTime,
            hostId: hostId,
            status: "notStarted",
            createdAt: new Date()
        }).then(() => {
            dispatch(scheduleMeetingSuccess());
            meeting.push('/');
        }).catch((err) => {
            dispatch(scheduleMeetingFail(err.message));
        })
    }
}

export const endMeeting = (meetingId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch(endMeetingStart());
        const hostId = getState().firebase.auth.uid;
        const firestore = getFirestore();
        firestore.collection('Meetings').doc(meetingId).update({
            status: "finished",
        }).then(() => {
            dispatch(endMeetingSuccess());
        }).catch((err) => {
            dispatch(endMeetingFail(err.message));
        })
    }

}



