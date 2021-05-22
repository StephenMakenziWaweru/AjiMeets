import React, { Component } from 'react'
import Navbar from '../shared/Navbar'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import moment from 'moment';
import { firestoreConnect } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux'
import Button from '@material-ui/core/Button';


const useStyles = (theme) => ({
    root: {
        height: '100vh',
        paddingRight: 15,
        paddinLeft: 15,
        marginRight: "auto",
        marginLeft: "auto"
    },
    dividerFullWidth: {
        margin: `5px 0 0 ${theme.spacing(2)}px`,
    },
    demo: {
        margin: 30,
        backgroundColor: theme.palette.background.paper,
    },


});



class MeetingDetail extends Component {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        const DOMAIN = 'http://localhost:3000/';
        const { auth, profile, classes, meeting } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        return (
            <div>
                <Navbar />
                <Grid container justify="center">
                    <Grid item xs={12} sm={6} md={6} component={Paper} elevation={4} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h4" style={{ marginTop: 50, textAlign: "center" }}>
                                {meeting.title}
                            </Typography>
                            <div className={classes.demo}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Host" secondary={meeting.hostFirstName ? this.capitalizeFirstLetter(meeting.hostFirstName) + " " + this.capitalizeFirstLetter(meeting.hostLastName) : null} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Meeting ID" secondary={meeting.meetingId} />
                                    </ListItem>
                                    {
                                        meeting.scheduledDateTime
                                            ?
                                            <ListItem>
                                                <ListItemText primary="Scheduled" secondary={moment(meeting.scheduledDateTime).format('MMMM Do YYYY, h:mm a')} />
                                            </ListItem>
                                            :
                                            null
                                    }
                                    <ListItem>
                                        <ListItemText primary="Meeting Link" secondary={<span style={{ color: "rgb(3, 132, 89)" }}>{DOMAIN}{meeting.meetingId}</span>} />
                                    </ListItem>

                                    {
                                        meeting.status === 'ongoing'
                                            ?
                                            <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
                                                <Button edge="end" aria-label="end" variant="contained" style={{ borderRadius: 30, backgroundColor: "#f72323", color: "white" }}>
                                                    End Meeting
                                                </Button>
                                            </div>
                                            :
                                            <Link to={`/meeting-room?name=${profile.firstName + ' ' + profile.lastName}&room=${meeting.meetingId}`} style={{ textDecoration: "none" }}>
                                                <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
                                                    <Button edge="end" aria-label="start" variant="contained" style={{ backgroundColor: "#32be8f", color: "white", borderRadius: 30 }}>
                                                        Start Meeting
                                                    </Button>
                                                </div>
                                            </Link>
                                    }
                                </List>
                            </div>

                        </div>
                    </Grid>

                </Grid>


            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const meetings = state.firestore.data.Meetings;
    const meeting = meetings ? meetings[id] : null
    return {
        meeting,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'Meetings' }
    ]),
    withStyles(useStyles))(MeetingDetail)

