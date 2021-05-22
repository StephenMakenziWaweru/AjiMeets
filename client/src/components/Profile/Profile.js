import React, { Component, Fragment } from 'react'
import "antd/dist/antd.css";
import Navbar from '../shared/Navbar'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import bg2 from '../../img/bgi.jpg';
import avatar from '../../img/avatar.svg';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { uploadProfImage } from '../../store/actions/authActions'
import { compose } from 'redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import Edit from '@material-ui/icons/Edit';
import Forward from '@material-ui/icons/Forward';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import './Profile.css'
import { Modal, Button as antButton, message } from 'antd';
import TextField from '@material-ui/core/TextField';
import { clearAllErrors, hostMeeting } from '../../store/actions/meetingActions';
import { firestoreConnect } from 'react-redux-firebase'
import { withFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import moment from 'moment';
import SettingsIcon from '@material-ui/icons/Settings';



const useStyles = (theme) => ({
    root: {
        height: '100vh',
        paddingRight: 15,
        paddinLeft: 15,
        marginRight: "auto",
        marginLeft: "auto"
    },

    profileList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,

    },
    large: {
        marginTop: 40,
        width: 100,
        height: 100,
    },
    image: {
        backgroundImage: `url(${bg2})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(4, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper2: {
        margin: theme.spacing(2, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        elevation: 4
    },
    dividerFullWidth: {
        margin: `5px 0 0 ${theme.spacing(2)}px`,
    },
    demo: {
        margin: 30,
        backgroundColor: theme.palette.background.paper,
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
        backgroundColor: "#32be8f",
        '&:hover': {
            background: "#33be6f",
        },
        marginTop: 50,
        color: "white",
        height: 30,
        borderRadius: 15,
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
    },
    profileImage: {
        position: "relative"
    },
    input: {
        display: 'none',
    },

    uploadBtn: {
        backgroundColor: "#32be8f",
        color: "white",
        fontSize: 20,
        margin: 5
    },
    progress: {
        color: "#32be8f"
    },

    submit: {
        backgroundColor: "#32be8f",
        '&:hover': {
            background: "#33be6f",
        },
        color: "white",

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
    },

    icons: {
        color: "#32be8f",
        marginTop: 20,
        fontSize: 80
    },
    sideBar: {
        marginTop: 15,
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

class Profile extends Component {
    state = {
        meetingTitle: "",
        modalVisible: false,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    showModal = () => {
        this.setState({
            modalVisible: true
        });
    }

    handleOk = () => {

    };

    handleCancel = () => {
        this.setState({
            modalVisible: false
        });
    };

    handleSubmit = (e) => {
        const { meetingTitle } = this.state;
        e.preventDefault();
        const meetingId = makeid(16);
        const { push } = this.props.history;
        const meeting = { meetingTitle, meetingId, push };

        if (meetingTitle === '') {
            message.error("Meeting Title cannot be empty!")
        } else {
            this.props.hostMeeting(meeting);
        }

        this.props.clearErrors();


    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    handleImageChange = (event) => {
        const image = event.target.files[0];
        this.props.uploadProfileImg(image, this.props.auth.uid);
    };

    render() {
        const { auth, profile, classes, loading, uploadError, meetingLoading, scheduledmeetings } = this.props;
        let imageUrl;
        if (profile.profileImageUrl) {
            imageUrl = profile.profileImageUrl;
        } else {
            imageUrl = avatar;
        }
        if (!auth.uid) return <Redirect to='/' />
        return (
            <Fragment>
                <Navbar />
                <Container>
                    <Grid container component="main" className={classes.root}>
                        <CssBaseline />
                        <Grid item xs={12} sm={4} md={3} component={Paper} className={classes.sideBar} elevation={4} square>
                            <div className={classes.paper}>
                                <div>
                                    <Avatar alt="Remy Sharp" src={imageUrl} className={classes.large} />
                                </div>
                                <input accept="image/*" className={classes.input} onChange={this.handleImageChange} id="icon-button-file" type="file" />
                                <label htmlFor="icon-button-file">
                                    <Tooltip title='Upload picture' placement="right-start">
                                        <IconButton className={classes.uploadBtn} aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </Tooltip>
                                </label>

                                {loading && (<Typography component="h6" variant="h6" style={{ marginTop: 10 }}>
                                    Uploading image...<CircularProgress className={classes.progress} size={30} />
                                </Typography>)}
                                {uploadError && (<Typography component="h6" variant="h6" style={{ marginTop: 10, color: "red" }}>
                                    {uploadError}
                                </Typography>)}
                                <List className={classes.profileList}>
                                    <ListItem>
                                        <ListItemText primary="Profile Names" secondary={profile.firstName ? this.capitalizeFirstLetter(profile.firstName) + " " + this.capitalizeFirstLetter(profile.lastName) : null} />
                                    </ListItem>
                                    <Link to='/update-profile'>
                                        <Button href="#text-buttons" color="primary" style={{ marginLeft: 7, color: "rgb(3, 132, 89)" }}>
                                            Change
                                    </Button>
                                    </Link>
                                    <Divider component="li" />
                                    <ListItem>
                                        <ListItemText primary="Personal ID" secondary={profile.personalID} />
                                    </ListItem>
                                    <Divider component="li" />
                                    <ListItem>
                                        <ListItemText primary="Current Timezone" secondary={profile.timezone ? profile.timezone : Intl.DateTimeFormat().resolvedOptions().timeZone} />
                                    </ListItem>
                                    <Link to='/change-timezone'>
                                        <Button href="#text-buttons" color="primary" style={{ marginLeft: 7, color: "rgb(3, 132, 89)" }}>
                                            Change
                                        </Button>
                                    </Link>
                                    <Divider component="li" />
                                    <ListItem>
                                        <ListItemIcon style={{ marginTop: 12 }}>
                                            <SettingsIcon style={{ color: "#32be8f", fontSize: 30 }} />
                                        </ListItemIcon>
                                        <Link to='/meeting-security'>
                                            <ListItemText primary="Meeting Settings" style={{ marginTop: 12, color: "rgb(3, 132, 89)" }} />
                                        </Link>
                                    </ListItem>
                                    <ListItem button></ListItem>
                                    <Divider component="li" />
                                </List>
                            </div>
                        </Grid>
                        <Grid xs={12} sm={8} md={9} container square style={{ display: "table" }} >
                            <Grid container style={{ display: "inline-flex" }}>
                                <Grid item md={3} sm={6} xs={6} className="zoom">
                                    <Link to='/profile-join-meeting' style={{ textDecoration: "none" }}>
                                        <Paper className={classes.paper2}>
                                            <Forward className={classes.icons} />
                                            <Typography variant="h6" component="h6" style={{ marginTop: 5 }}>Join a Meeting</Typography>
                                        </Paper>
                                    </Link>
                                </Grid>
                                <Grid item md={3} sm={6} xs={6} className="zoom" onClick={this.showModal}>
                                    <Paper className={classes.paper2}>
                                        <GroupIcon className={classes.icons} />
                                        <Typography variant="h6" component="h6" style={{ marginTop: 5 }}>Host a Meeting</Typography>
                                    </Paper>
                                </Grid>
                                <Modal
                                    title="Host a Meeting"
                                    visible={this.state.modalVisible}
                                    onOk={this.handleOk}
                                    confirmLoading={meetingLoading}
                                    onCancel={this.handleCancel}
                                    footer={[
                                        <Button variant="outlined" onClick={this.handleCancel}>
                                            Cancel
                                        </Button>,
                                        <Button
                                            onClick={this.handleSubmit}
                                            type="submit"
                                            variant="contained"
                                            className={classes.submit}
                                            disabled={meetingLoading}
                                        >
                                            Start Meeting
                                        {meetingLoading && (<CircularProgress size={30} className={classes.progress} />)}
                                        </Button>,
                                    ]}
                                >
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        id="meetingTitle"
                                        label="Meeting title"
                                        name="meetingTitle"
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.label,
                                                focused: classes.focusedLabel,
                                                error: classes.erroredLabel
                                            }
                                        }}
                                    />
                                </Modal>
                                <Grid item md={3} sm={6} xs={6} className="zoom" >
                                    <Link to='/schedule-meeting' style={{ textDecoration: "none" }}>
                                        <Paper className={classes.paper2}>
                                            <ScheduleIcon className={classes.icons} />
                                            <Typography variant="h6" component="h6" style={{ marginTop: 5 }}>Schedule a Meeting</Typography>
                                        </Paper>
                                    </Link>
                                </Grid>
                                <Grid item md={3} sm={6} xs={6} className="zoom">
                                    <Link to='/meetings' style={{ textDecoration: "none" }}>
                                        <Paper className={classes.paper2}>
                                            <CalendarTodayIcon className={classes.icons} />
                                            <Typography variant="h6" component="h6" style={{ marginTop: 5 }}>My Meetings</Typography>
                                        </Paper>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={12} sm={12}>
                                    <Typography variant="h4" component="h4" style={{ marginLeft: 20, marginTop: 50 }}>Upcoming Meetings</Typography>

                                    <div className={classes.demo}>
                                        <List>
                                            {
                                                isEmpty(scheduledmeetings)
                                                    ?
                                                    <Typography variant="h6" component="h6" style={{ marginLeft: 20, marginTop: 50, fontStyle: "italic", color: "grey" }}>You have not scheduled any meeting at the moment!</Typography>
                                                    :
                                                    scheduledmeetings.map((meeting) =>
                                                        <Link to={'meeting/' + meeting.meetingId} key={meeting.meetingId}>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <ScheduleIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={<span style={{ color: "rgb(3, 132, 89)" }}>{meeting.title}</span>}
                                                                    secondary={moment(meeting.scheduledDateTime).format('MMMM Do YYYY, h:mm a')}
                                                                />
                                                                <ListItemSecondaryAction>

                                                                    {
                                                                        meeting.status === 'ongoing'
                                                                            ?
                                                                            <Button edge="end" aria-label="end" variant="contained" style={{ backgroundColor: "#f72323", color: "white", borderRadius: 30 }}>
                                                                                End
                                                                                </Button>
                                                                            :
                                                                            <Link to={`/meeting-room?name=${profile.firstName + ' ' + profile.lastName}&room=${meeting.meetingId}`} style={{ textDecoration: "none" }}>
                                                                                <Button edge="end" aria-label="start" variant="contained" style={{ backgroundColor: "#32be8f", color: "white", borderRadius: 30 }}>
                                                                                    Start
                                                                                </Button>
                                                                            </Link>
                                                                    }

                                                                </ListItemSecondaryAction>
                                                            </ListItem>
                                                        </Link>
                                                    )
                                            }

                                        </List>
                                    </div>


                                </Grid>
                            </Grid>


                        </Grid>
                    </Grid>

                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        loading: state.auth.loading,
        profile: state.firebase.profile,
        uploadError: state.auth.uploadError,
        meetingLoading: state.meeting.loading,
        scheduledmeetings: state.firestore.ordered.Meetings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadProfileImg: (data, userId) => dispatch(uploadProfImage(data, userId)),
        hostMeeting: (meeting) => dispatch(hostMeeting(meeting)),
        clearErrors: () => dispatch(clearAllErrors())
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {
            collection: 'Meetings', orderBy: ['createdAt', 'desc'], where: [
                ['hostId', '==', props.auth.uid || null],
                ['status', '==', 'notStarted']
            ]
        }
    ]),
    withStyles(useStyles))(Profile)

