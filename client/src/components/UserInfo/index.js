import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    userInfo: {
        marginLeft: '10px'
    }
}));


function UserInfo() {
    const classes = useStyles();

    return (
        <div className={classes.userInfo}>
            <img alt="userProfilePic" src="http://place-puppy.com/200x200"></img>
            <li className='userInfo'>Name: *user's name*</li>
            <li className='userInfo'>Username: *user's username*</li>
            <li className='userInfo'>Email???: *user's name*</li>
        </div>
    )
};

export default UserInfo;