import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../shared/Navbar';
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './MeetingSecurity.css'
import { clearAllErrors, updateMeetingSettings } from '../../store/actions/authActions';

const useStyles = (theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#32be8f",
        '&:hover': {
            background: "#33be6f",
        },
        color: "white",
        height: 50,
        borderRadius: 25,
        position: "relative"
    },
    textField: {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#32be8f",
                borderWidth: "2px",
            },

        },
    },

    label: {
        "&$focusedLabel": {
            color: "#32be8f"
        },
    },
    focusedLabel: {},
    erroredLabel: {},
    progress: {
        position: "absolute",
        color: "#32be8f"
    }
});

const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#32be8f',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#32be8f',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

class MeetingSecurity extends Component {
    state = {
        lockMeeting: this.props.profile.lockMeeting ? this.props.profile.lockMeeting : false,
        waitingRoom: this.props.profile.waitingRoom ? this.props.profile.waitingRoom : false,
        participantsShareScreen: this.props.profile.participantsShareScreen ? this.props.profile.participantsShareScreen : false,
        participantsMuteUnmute: this.props.profile.participantsMuteUnmute ? this.props.profile.participantsMuteUnmute : true,
        participantsVideoOnOff: this.props.profile.participantsVideoOnOff ? this.props.profile.participantsVideoOnOff : true
    }
    handleChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };
    handleSubmit = (e) => {
        const { lockMeeting,
            waitingRoom,
            participantsShareScreen,
            participantsMuteUnmute,
            participantsVideoOnOff } = this.state;
        const userId = this.props.auth.uid;
        const { push } = this.props.history;
        e.preventDefault();
        const meetingOptions = { userId, push, lockMeeting, waitingRoom, participantsShareScreen, participantsMuteUnmute, participantsVideoOnOff };
        this.props.updateSettings(meetingOptions);

    }
    render() {
        const { auth, meetingSecurityError, loading, classes, profile } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        return (
            <div>
                <Navbar />
                <Grid container justify="center">
                    <Grid item xs={12} sm={5} md={5} component={Paper} elevation={4} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h4">
                                Update Meeting Security
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                                <FormGroup style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<IOSSwitch checked={this.state.lockMeeting} onChange={this.handleChange} name="lockMeeting" />}
                                        label="Lock meeting"
                                    />
                                    <FormControlLabel
                                        control={<IOSSwitch checked={this.state.waitingRoom} onChange={this.handleChange} name="waitingRoom" />}
                                        label="Enable waiting room"
                                    />
                                    <FormControlLabel
                                        control={<IOSSwitch checked={this.state.participantsShareScreen} onChange={this.handleChange} name="participantsShareScreen" />}
                                        label="Allow participants to share screen"
                                    />
                                    <FormControlLabel
                                        control={<IOSSwitch checked={this.state.participantsMuteUnmute} onChange={this.handleChange} name="participantsMuteUnmute" />}
                                        label="Allow participants to mute and unmute themselves"
                                    />
                                    <FormControlLabel
                                        control={<IOSSwitch checked={this.state.participantsVideoOnOff} onChange={this.handleChange} name="participantsVideoOnOff" />}
                                        label="Allow participants to show and hide video themselves"
                                    />

                                </FormGroup>
                                {meetingSecurityError ? <Typography style={{ color: "red", textAlign: "center" }}>{meetingSecurityError}</Typography> : null}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    disabled={loading}
                                >
                                    Update
                                    {loading && (<CircularProgress size={30} className={classes.progress} />)}

                                </Button>
                            </form>
                        </div>
                    </Grid>

                </Grid>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        meetingSecurityError: state.auth.meetingSecurityError,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearErrors: () => dispatch(clearAllErrors()),
        updateSettings: (meeting) => dispatch(updateMeetingSettings(meeting))

    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(useStyles))(MeetingSecurity)

