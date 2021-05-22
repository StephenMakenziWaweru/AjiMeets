import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DatePicker, message, TimePicker, Select } from 'antd';
import { scheduleMeeting, clearAllErrors } from '../../store/actions/meetingActions';

const { RangePicker } = TimePicker;
const { Option } = Select;

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

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



class ScheduleMeeting extends Component {
    state = {
        meetingTitle: "",
        selectedDateTime: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        const { meetingTitle, selectedDateTime } = this.state;
        e.preventDefault();
        const meetingId = makeid(16);
        const { push } = this.props.history;
        const meeting = { meetingTitle, meetingId, push, selectedDateTime };

        if (meetingTitle === '') {
            message.error("Meeting Title cannot be empty!");
        } else if (selectedDateTime === '') {
            message.error("Date and time cannot be empty");
        } else {
            this.props.schedule(meeting);
        }

        this.props.clearErrors();


    }


    onDateChange = (value, dateString) => {
        this.setState({
            selectedDateTime: dateString
        });
    }

    onOk(value) {
        console.log('onOk: ', value);
    }
    render() {
        const { auth, profile, loading, classes, scheduleError } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        return (
            <div>
                <Navbar />
                <Grid container justify="center">
                    <Grid item xs={12} sm={5} md={5} component={Paper} elevation={4} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h4">
                                Schedule a Meeting
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={this.handleChange}
                                    value={this.state.meetingTitle}
                                    id="meetingTitle"
                                    label="Meeting title"
                                    name="meetingTitle"
                                    autoComplete="meetingTitle"
                                    autoFocus
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.label,
                                            focused: classes.focusedLabel,
                                            error: classes.erroredLabel
                                        }
                                    }}
                                />
                                <DatePicker style={{ padding: 12, width: "100%" }} placeholder="Select date and time" showTime={{ format: 'HH:mm' }} onChange={this.onDateChange} onOk={this.onOk} />
                                <RangePicker style={{ padding: 12, width: "100%", marginTop: 10 }} />
                                <Select defaultValue="Reccurring Never" style={{ width: "100%", marginTop: 10, height: 30 }}>
                                    <Option value="everyday">Every Day</Option>
                                    <Option value="weekly">Every Week</Option>
                                    <Option value="bi-weekly">Every 2 Weeks</Option>
                                    <Option value="monthly">Every Month</Option>
                                    <Option value="yearly">Every Year</Option>
                                </Select>
                                {scheduleError && (<Typography component="h6" variant="h6" style={{ marginTop: 10, color: "red" }}>
                                    {scheduleError}
                                </Typography>)}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    disabled={loading}
                                >
                                    Schedule
                                    {loading && (<CircularProgress size={30} className={classes.progress} />)}

                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>

            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        loading: state.meeting.loading,
        scheduleError: state.meeting.scheduleError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        schedule: (meeting) => dispatch(scheduleMeeting(meeting)),
        clearErrors: () => dispatch(clearAllErrors())
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(useStyles))(ScheduleMeeting)
