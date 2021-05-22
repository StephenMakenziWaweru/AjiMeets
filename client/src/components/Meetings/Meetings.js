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
import { compose } from 'redux'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


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



class Meetings extends Component {
    render() {
        const { auth, profile, classes, meetings } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        return (
            <div>
                <Navbar />
                <Grid container justify="center">
                    <Grid item xs={12} sm={6} md={6} component={Paper} elevation={4} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h4" style={{ marginTop: 50, textAlign: "center" }}>
                                Meetings
                            </Typography>
                            <div className={classes.demo}>
                                <List>
                                    {
                                        isEmpty(meetings)
                                            ?
                                            <Typography variant="h6" component="h6" style={{ justifyContent: "center", marginLeft: 20, marginTop: 50, fontStyle: "italic", color: "grey" }}>You have not hosted any meetings before!</Typography>
                                            :
                                            meetings.map((meeting) =>
                                                <Link to={'meeting/' + meeting.meetingId} key={meeting.meetingId}>
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <CalendarTodayIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={<span style={{ color: "rgb(3, 132, 89)" }}>{meeting.title}</span>}
                                                            secondary={moment(meeting.createdAt.toDate()).format('MMMM Do YYYY, h:mm a')}
                                                        />
                                                    </ListItem>
                                                </Link>
                                            )


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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        meetings: state.firestore.ordered.Meetings
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {
            collection: 'Meetings', orderBy: ['createdAt', 'desc'], where: [
                ['hostId', '==', props.auth.uid || null]
            ]
        }
    ]),
    withStyles(useStyles))(Meetings)
