import { React, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export default function SignedOutButtonLinks() {
    return (
        <Fragment>
            <Button><Link to='/join-meeting' style={{ color: "#575454", textDecoration: "none", fontWeight: "bold" }}>Join a Meeting</Link></Button>
            <Button><Link to='/' style={{ color: "#575454", textDecoration: "none", fontWeight: "bold" }}>Login</Link></Button>
            <Button><Link to='/register' style={{ color: "#575454", textDecoration: "none", fontWeight: "bold" }}>Register</Link></Button>
        </Fragment>
    )
}
