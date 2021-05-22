import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link as LinkRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../shared/Navbar';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { clearAllErrors } from '../../store/actions/authActions';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import { updateTimezone } from '../../store/actions/authActions';
import { message } from 'antd';

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

class TimeZonePicker extends Component {
    state = {
        selectedTimezone: "",
        absolute: false
    }

    handleChange = (timezone) => {
        this.setState({ selectedTimezone: timezone });
    }

    handleSubmit = (e) => {
        const { selectedTimezone } = this.state;
        const { push } = this.props.history;
        const userId = this.props.auth.uid;
        const updatedZone = { selectedTimezone, push, userId }
        e.preventDefault();
        if (selectedTimezone === '') {
            message.error("Timezone cannot be empty")

        } else {
            this.props.changeTimeZone(updatedZone);
        }
        this.props.clearErrors();

    }
    render() {
        const { auth, profile, loading, classes, timeError } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        return (
            <div>
                <Navbar />
                <Grid container justify="center">
                    <Grid item xs={12} sm={5} md={5} component={Paper} elevation={4} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h4">
                                Select Timezone
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                                <TimezonePicker
                                    placeholder="Select timezone..."
                                    onChange={this.handleChange}
                                    absolute={this.state.absolute}
                                    value={this.state.currentValue}
                                    style={{ width: "100%", marginTop: 10, padding: 12 }}
                                />
                                {timeError && (<Typography component="h6" variant="h6" style={{ marginTop: 10, color: "red" }}>
                                    {timeError}
                                </Typography>)}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    disabled={loading}
                                >
                                    Change
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
        loading: state.auth.loading,
        timeError: state.auth.timezoneError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearErrors: () => dispatch(clearAllErrors()),
        changeTimeZone: (timeObject) => dispatch(updateTimezone(timeObject))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(useStyles))(TimeZonePicker)

